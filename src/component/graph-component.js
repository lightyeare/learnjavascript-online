import { LitElement, html } from "lit";

export class GraphComponent extends LitElement {
  static properties = {
    chartId: { type: String },
  };

  render() {
    console.log("render");
    return html`<div
      class="chart-container"
      style="position: relative; height:30vh; width:60vw"
    >
      <canvas id="${this.chartId}" class="chart"></canvas>
    </div>`;
  }
}
