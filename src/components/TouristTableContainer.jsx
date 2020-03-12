import React, { Component } from 'react';
import MaterialTable from 'material-table';

export class TouristTableContainer extends Component {

    constructor(){
      super();
      this.state = {
        isLoading: true,
        tourists: [],
      }
    }

    async showTourists(){
      fetch('http://localhost:8080/tourists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then((json) => {
        this.setState({
          tourists: json,
          isLoading: false})
      });
    }

    componentDidMount(){
      this.showTourists();
      console.log(this.state.tourists);
    }

    async handleUpdate(newData){
      fetch('http://localhost:8080/tourists/'.concat(newData.id), {
        method: "PUT",
        body: JSON.stringify({
          id: newData.id,
          name: newData.name,
          surname: newData.surname,
          gender: newData.gender,
          country: newData.country,
          notes: newData.notes,
          birthday: newData.birthday,
          flightList: newData.flightList,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(this.showTourists());
    }

    async handleAdd(newData) {
      if(newData.notes == null)
      newData.notes = '';
      if(newData.flightList == null)
      newData.flightList = [];

      fetch('http://localhost:8080/tourists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newData.name,
          surname: newData.surname,
          gender: newData.gender,
          country: newData.country,
          notes: newData.notes,
          birthday: newData.birthday,
          flightList: newData.flightList,
        })
      })
      .then(this.showTourists());

      // const dto = newData;
      // const request = new Request('http://localhost:8080/tourists', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(dto)
      // });

      // const data = await fetch(request);
      // const response = await data.json();
      // this.setState({response});
      // this.setState({response, responseState: data.ok})
    }

    async handleDelete(oldData){
      fetch('http://localhost:8080/tourists/', {
        method: "DELETE",
        body: oldData.id,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      });

      this.showTourists();
    }

    render() {
        return (
            <section id="tourist-table-container" className="table-container">
              {!this.state.isLoading ? (
                <MaterialTable 
                  title="Tourists"
                  columns={[
                    { title: 'ID', field: 'id', hidden: true },
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Gender', field: 'gender' },
                    { title: 'Country', field: 'country' },
                    { title: 'Notes', field: 'notes' },
                    { title: 'Birthday', field: 'birthday' },
                    { title: 'List of flights', field: 'flightList' }
                  ]}
                  data={this.state.tourists}
                  editable={{
                    onRowAdd: newData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          this.handleAdd(newData);
                          this.setState(prevState => {
                            const data = [...prevState.tourists];
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
                              const data = [...prevState.tourists];
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
                            const data = [...prevState.tourists];
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

export default TouristTableContainer
