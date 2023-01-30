const fetch = require('node-fetch');
const { Instrument } = require('../models');

class InstrumentsLoader {
    #srcUri;

    constructor(srcUri) {
        if (!srcUri) {
            throw 'Missing mandatory "srcUri" string';
        }

        this.#srcUri = srcUri
    }

    async #fetchInstruments() {
        const res = await fetch(this.#srcUri);
        const srcEntries = await res.json();

        if (!srcEntries?.length) {
            return [];
        }
        
        return srcEntries.map((srcEntry) => ({
            symbol: srcEntry.symbol,
            name: srcEntry.name,
            price: srcEntry?.['market_data']?.['current_price']?.['usd'],
        }));
    }

    #storeInstruments(entries) {
        entries.forEach((entry) => this.#storeInstrumentEntry(entry));
    }

    async #storeInstrumentEntry({ symbol, name, price }) {
        const now = new Date().toISOString();
        const instrumentData = {
            instrument_symbol: symbol,
            instrument_name: name,
            usd_price: price,
        };
        // TODO: beware cross-database implementation issues!
        return Instrument
            .query()
            .insert({
                ...instrumentData,
                created_at: now,
            })
            .onConflict('instrument_symbol')
            .merge({
                ...instrumentData,
                updated_at: now,
            });
    }

    async load() {
        const entries = await this.#fetchInstruments();

        this.#storeInstruments(entries);
    }
}

module.exports = InstrumentsLoader;
