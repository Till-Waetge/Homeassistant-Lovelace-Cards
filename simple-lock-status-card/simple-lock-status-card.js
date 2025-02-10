class BathStatusCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            this.innerHTML = `
                <style>
                    .bath-status-card {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 16px;
                        border-radius: 8px;
                        font-size: 1.5em;
                        font-weight: bold;
                        transition: background-color 0.3s ease;
                    }
                    .bath-status-icon {
                        font-size: 1.5em;
                    }
                    .bath-status-text {
                        flex-grow: 1;
                        text-align: right;
                    }
                </style>
                <div class="bath-status-card" id="bath-status">
                    <span class="bath-status-icon" id="bath-status-icon"><ha-icon icon="mdi:door-open"></ha-icon></span>
                    <span class="bath-status-text" id="bath-text"></span>
                </div>
            `;
            this.content = this.querySelector('#bath-status');
            this.iconElement = this.querySelector('#bath-status-icon');
            this.textElement = this.querySelector('#bath-text');
        }

        const entityId = this.config.entity;
        const state = hass.states[entityId].state;
        const occupiedText = this.config.occupied_text || 'Besetzt';
        const freeText = this.config.free_text || 'Frei';
        
        if (state === 'on') {
            this.textElement.textContent = occupiedText;
            this.content.style.backgroundColor = 'red';
            this.content.style.color = 'white';            
            this.iconElement.innerHTML = '<ha-icon icon="mdi:door-closed-lock"></ha-icon>';

        } else {
            this.textElement.textContent = freeText;
            this.content.style.backgroundColor = 'green';
            this.content.style.color = 'white';
            this.iconElement.innerHTML = '<ha-icon icon="mdi:door-open"></ha-icon>';
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

customElements.define('bath-status-card', BathStatusCard);