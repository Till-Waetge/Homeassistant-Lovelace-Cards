class StatusCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            this.innerHTML = `
                <style>
                    .status-card {
                        padding: 16px;
                        border-radius: 8px;
                        text-align: center;
                        font-size: 1.5em;
                        font-weight: bold;
                        transition: background-color 0.3s ease;
                    }
                </style>
                <div class="status-card" id="status"></div>
            `;
            this.content = this.querySelector('#status');
        }

        const entityId = this.config.entity;
        const state = hass.states[entityId].state;
        const occupiedText = this.config.occupied_text || 'Besetzt';
        const freeText = this.config.free_text || 'Frei';
        
        if (state === 'on') {
            this.content.textContent = occupiedText;
            this.content.style.backgroundColor = 'red';
            this.content.style.color = 'white';
        } else {
            this.content.textContent = freeText;
            this.content.style.backgroundColor = 'green';
            this.content.style.color = 'white';
        }
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Sie müssen eine Entität angeben.');
        }
        this.config = config;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('status-card', StatusCard);