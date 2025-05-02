import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "../navbar/navbar.component";
import * as d3 from "d3";

@Component({
  selector: "app-reports",
  imports: [NavbarComponent, HttpClientModule],
  templateUrl: "./reports.component.html",
  styleUrl: "./reports.component.css",
})
export class ReportsComponent implements OnInit {
  reportsData: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.initializeReportsPage();
  }

  async initializeReportsPage() {
    try {
      await this.fetchReportsData();
      this.createChartWithReportsData();
    } catch (error) {
      console.error("Error during page initialization:", error);
    }
  }

  fetchReportsData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>("http://localhost:3000/api/reports").subscribe({
        next: (response) => {
          this.reportsData = response;
          resolve();
        },
        error: (error) => {
          console.error("Error fetching summary data:", error);
          reject(error);
        },
      });
    });
  }

  createChartWithReportsData(): void {
    const data = this.reportsData;

    const width = 400;
    const height = 400;
    const margin = 20;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select("#donutChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.innovationArea))
      .range(["#06b6d4", "#3b82f6", "#9333ea", "#f59e0b", "#f43f5e"]);

    const pie = d3
      .pie<any>()
      .sort(null)
      .value((d) => d.focusPercentage);

    const data_ready = pie(data);

    const arc = d3
      .arc<any>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.9);

    const tooltip = d3
      .select("#donutChart")
      .append("div")
      .style("opacity", 0)
      .attr(
        "class",
        "absolute text-xs text-white bg-gray-900 p-2 rounded-lg shadow-lg border border-cyan-400",
      )
      .style("pointer-events", "none");

    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => color(d.data.innovationArea) as string)
      .attr("stroke", "#1f2937")
      .style("stroke-width", "1px")
      .style("opacity", 0.8)
      .on("mouseover", function (event, d) {
        tooltip
          .style("opacity", 1)
          .html(
            `<div><strong>${d.data.innovationArea}</strong>: ${d.data.focusPercentage}%</div>`,
          )
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY - 20 + "px");
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("stroke-width", "2px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY - 20 + "px");
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", 0);
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 0.8)
          .style("stroke-width", "1px");
      });
  }
}
