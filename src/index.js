import { LitElement, html, css } from 'lit';
import '@material/mwc-button';
import './BreweryDetail.js';

class BreweryApp extends LitElement {
  static properties = {
    loading: { type: Boolean },
    breweries: { type: Array },
    filter: { type: String },
  };

  static styles = css`
    h1 {
      color: blue;
    }

    p {
      color: blue;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    this.loading = true;
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html` <p>Loading...</p> `;
    }

    const totalVisited = this.breweries.filter(b => b.visited).length;
    const totalNotVisited = this.breweries.length - totalVisited;
    const breweries = this.breweries.filter(brewery => {
      if (!this.filter) {
        return true;
      }
      return this.filter === 'visited' ? brewery.visited : !brewery.visited;
    });

    return html`
      <h1>Breweries App</h1>

      <h2>Breweries</h2>
      <p>(${totalVisited} visited and ${totalNotVisited} still to go)</p>

      <mwc-button @click=${this._filterNone}>Filter none</mwc-button>
      <mwc-button @click=${this._filterVisited}>Filter visited</mwc-button>
      <mwc-button @click=${this._filterNotVisited}>Filter not-visited</mwc-button>

      <ul>
        ${breweries.map(
          brewery => html`
            <li>
              <brewery-detail
                .name=${brewery.name}
                .type=${brewery.brewery_type}
                .city=${brewery.city}
                .visited=${brewery.visited}
                @toggle-visited-status=${() => this.toggleVisitedStatus(brewery)}
              ></brewery-detail>
            </li>
          `,
        )}
      </ul>
    `;
  }

  toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map(brewery => {
      return brewery === breweryToUpdate ? { ...brewery, visited: !brewery.visited } : brewery;
    });
  }

  _filterNone() {
    this.filter = null;
  }

  _filterVisited() {
    this.filter = 'visited';
  }

  _filterNotVisited() {
    this.filter = 'not-visited';
  }
}

customElements.define('brewery-app', BreweryApp);
