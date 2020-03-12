import React, { Component } from 'react';
import MaterialTable from 'material-table';

export class FlightTableContainer extends Component {

    constructor(){
        super();
        this.state = {
          isLoading: true,
          flights: [],
        }
      }

    async showFlights(){
      fetch('http://localhost:8080/flights', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then((json) => {
        this.setState({
          flights: json,
          isLoading: false})
      });
    }

    componentDidMount(){
      this.showFlights();
      console.log(this.state.flights);
    }

    async handleUpdate(newData){
      fetch('http://localhost:8080/flights/'.concat(newData.id), {
        method: "PUT",
        body: JSON.stringify({
          id: newData.id,
          departure: newData.departure,
          arrival: newData.arrival,
          seatCount: newData.seatCount,
          touristList: newData.touristList,
          ticketPrice: newData.ticketPrice,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(this.showFlights());
    }

    async handleAdd(newData) {
      if(newData.touristList == null)
      newData.touristList = [];

      fetch('http://localhost:8080/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departure: newData.departure,
          arrival: newData.arrival,
          seatCount: newData.seatCount,
          touristList: newData.touristList,
          ticketPrice: newData.ticketPrice,
        })
      })
      .then(this.showFlights());
    }

    async handleDelete(oldData){
      fetch('http://localhost:8080/flights/', {
        method: "DELETE",
        body: oldData.id,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      });
      this.showFlights();
    }

    render() {
      return (
        <section id="flight-table-container" className="table-container">
          {!this.state.isLoading ? (
            <MaterialTable 
              title="Flights"
              columns={[
                { title: 'ID', field: 'id', hidden: true },
                { title: 'Departure', field: 'departure' },
                { title: 'Arrival', field: 'arrival' },
                { title: 'Seat count', field: 'seatCount' },
                { title: 'Tourist list', field: 'touristList', hidden: true },
                { title: 'Ticket price', field: 'ticketPrice' },
              ]}
              data={this.state.flights}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      this.handleAdd(newData);
                      this.setState(prevState => {
                        const data = [...prevState.flights];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      this.handleUpdate(newData);
                      if (oldData) {
                        this.setState(prevState => {
                          const data = [...prevState.flights];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      this.handleDelete(oldData);
                      this.setState(prevState => {
                        const data = [...prevState.flights];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                }}
            />
            ) : (
              <h3>Loading...</h3>
          )}
        </section>
      )
    }
}

export default FlightTableContainer
