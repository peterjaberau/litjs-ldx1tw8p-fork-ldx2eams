import { LitElement, html, css } from 'lit';

class BreweryDetail extends LitElement {
  static properties = {
    name: { type: String },
    type: { type: String },
    city: { type: String },
    visited: { type: Boolean },
  };

  static styles = css`
    h1 {
      color: red;
    }

    p {
      color: red;
    }
  `;

  render() {
    return html`
      <h3>${this.name} (${this.visited ? 'visited' : 'not-visited'})</h3>
      <p>brewery type: ${this.type}</p>
      <p>city: ${this.city}</p>
      <mwc-button @click=${this._toggleVisitedStatus}>
        Mark as ${this.visited ? 'not-visited' : 'visited'}
      </mwc-button>
    `;
  }

  _toggleVisitedStatus() {
    this.dispatchEvent(new CustomEvent('toggle-visited-status'));
  }
}

customElements.define('brewery-detail', BreweryDetail);
