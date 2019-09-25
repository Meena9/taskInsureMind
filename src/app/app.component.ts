import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppService } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}
  LineChart = [];
  title = 'Insure';
  table_data: any = [];
  Sent = {
    label: '-Sent',
    data: [],

    fill: false,
    borderColor: 'Green'
  };

  Opened = {
    label: ' -Opened',
    data: [],

    fill: false,
    borderColor: 'Pink'
  };
  Bounced = {
    label: ' -Bounced',
    data: [],

    fill: false,
    borderColor: 'blue'
  };
  Complaint = {
    label: '-Complaint',
    data: [],

    fill: false,
    borderColor: 'Red'
  };
  chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    },
    elements: {
      bezierCurve: true
    }
  };
  ngOnInit() {
    this.getdata();
  }

  speedData = {
    labels: [],
    datasets: [this.Sent, this.Opened, this.Bounced, this.Complaint]
  };
  getdata() {
    this.appService.getdata().subscribe(
      (data: any) => {
        this.table_data = JSON.parse(data._body);
        let labelsx = [],
          sentdata = [],
          openeddata = [],
          bouncedata = [],
          compilentdata = [];
        this.table_data.map(prop => {
          labelsx.push(prop.title);
          sentdata.push(prop.report.Sent);
          openeddata.push(prop.report.Opened);
          bouncedata.push(prop.report.Bounced);
          compilentdata.push(prop.report.Complaint);
        });

        this.speedData.labels = labelsx;
        this.Sent.data = sentdata;
        this.Bounced.data = bouncedata;
        this.Opened.data = openeddata;
        this.Complaint.data = compilentdata;
        this.LineChart = new Chart('lineChart', {
          type: 'line',
          data: this.speedData,
          options: this.chartOptions
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
