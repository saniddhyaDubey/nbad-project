import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "../navbar/navbar.component";
import * as d3 from "d3";

@Component({
  selector: "app-summary",
  imports: [NavbarComponent, HttpClientModule],
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.css",
})
export class SummaryComponent implements OnInit {
  summaryData: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.initializeSummaryPage();
  }

  async initializeSummaryPage() {
    try {
      await this.fetchSummaryData();
      this.createChartWithSummaryData();
    } catch (error) {
      console.error("Error during page initialization:", error);
    }
  }

  fetchSummaryData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>("http://localhost:3000/api/summary").subscribe({
        next: (response) => {
          this.summaryData = response;
          resolve();
        },
        error: (error) => {
          console.error("Error fetching summary data:", error);
          reject(error);
        },
      });
    });
  }

  createChartWithSummaryData(): void {
    const data = this.summaryData;

    const margin = { top: 30, right: 20, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#barChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.3);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d: any, i: number) => d3.format("d")(d)),
      )
      .attr("class", "text-gray-400 text-xs");

    // Y Axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.capacityGW)! + 100])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y)).attr("class", "text-gray-400 text-xs");

    // Bars
    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.year)!)
      .attr("y", height) // Start from bottom
      .attr("width", x.bandwidth())
      .attr("height", 0) // Start height 0
      .attr("fill", "url(#barGradient)") // Use a gradient for fill
      .transition()
      .duration(1500)
      .ease(d3.easeCubic)
      .attr("y", (d) => y(d.capacityGW))
      .attr("height", (d) => height - y(d.capacityGW));

    // Gradient Fill
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "barGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#3b82f6") // Bright blue top
      .attr("stop-opacity", 0.9);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#06b6d4") // Cyan bottom
      .attr("stop-opacity", 0.6);
  }
}
