class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
	{
		id: 101,
		firstName: 'Sue',
		lastName: 'Corson',
		email: 'DWhalley@in.gov',
		phone: '(612)211-6296',
		address: {
			streetAddress: '9792 Mattis Ct',
			city: 'Waukesha',
			state: 'WI',
			zip: '22178'
		},
		description: 'et lacus magna dolor...',
	},
    	{
		id: 102,
		firstName: 'Sue1',
		lastName: 'oCorson1',
		email: 'DWgjgjhalley@in.gov',
		phone: '(612)211-6296',
		address: {
			streetAddress: '9792 Mattis Ct',
			city: 'Waukesha',
			state: 'WI',
			zip: '22178'
		},
		description: 'et lacus magna dolor...',
	},
          	{
		id: 103,
		firstName: 'Sue2',
		lastName: 'Corgjgson1',
		email: 'ghjDWhalley@in.gov',
		phone: '(612)211-6296',
		address: {
			streetAddress: '9792 Mattis Ct',
			city: 'Waukesha',
			state: 'WI',
			zip: '22178'
		},
		description: 'et lacus magna dolor...',
	},
          	{
		id: 104,
		firstName: 'Sue3',
		lastName: '1Corson',
		email: '1DWhalley@in.gov',
		phone: '(612)211-6296',
		address: {
			streetAddress: '9792 Mattis Ct',
			city: 'Waukesha',
			state: 'WI',
			zip: '22178'
		},
		description: 'et lacus magna dolor...',
	}
],
      isLoading: false,
      sortedBy: "",
      page: 1,
      search: "",
      formDisplayed: false,
      focusedElement: {}
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleColumnClick = this.handleColumnClick.bind(this);
    this.handlePageInputChange = this.handlePageInputChange.bind(this);
    this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTableRowClick = this.handleTableRowClick.bind(this);

    this.longListURL =
      "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

    this.shortListURL =
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  }

  getData(URL) {
    this.setState({isLoading: true});
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ data: data, isLoading: false });
      })
      .catch(error => {
        console.log(error.message);
        alert(`Data retrieving error
${error.message}
                `);
      });
  }

  handleButtonClick(event) {
    let element = event.target;

    if (element.classList.contains("short-list")) {
      this.getData(this.shortListURL);
    }

    if (element.classList.contains("long-list")) {
      this.getData(this.longListURL);
    }
  }

  handleColumnClick(event) {
    const clickedElementAttribute = event.target.getAttribute("data-click");

    if (!clickedElementAttribute) return;

    const SORTED = this.state.sortedBy === clickedElementAttribute;

    const newSortedBy = SORTED ? "" : clickedElementAttribute;

    const sortedData = [...this.state.data].sort((a, b) => {
      if (SORTED) {
        return a[clickedElementAttribute] < b[clickedElementAttribute] ? 1 : -1;
      }

      return a[clickedElementAttribute] > b[clickedElementAttribute] ? 1 : -1;
    });

    this.setState({
      data: sortedData,
      sortedBy: newSortedBy
    });
    // decoration with JS ->
    const thElements = document.querySelectorAll("th[data-click]");

    for (let i = 0; i < thElements.length; i++) {
      thElements[i].classList.remove("triangle-marker", "triangle-marker-up");
    }
    event.target.classList.add(
      SORTED ? "triangle-marker" : "triangle-marker-up"
    );
  }

  handlePageButtonClick(event) {
    const element = event.target;
    if (!element.hasAttribute("data-page")) return;
    console.log("here");
    const increment = element.getAttribute("data-page") === "next" ? 1 : -1;

    this.setState({ page: this.state.page + increment });

    console.log(this.state.page);
  }

  handlePageInputChange(event) {
    this.setState({ page: event.target.value });
  }

  handleSearchInputChange(event) {

    let searchString = event.target.value;
    searchString = searchString.replace(/[\[\\\^\$\.\|\?\*\+\(\)]/g, "\\$&");
    this.setState({ search: searchString });
  }

  handleAddButtonClick(event) {
    this.setState({formDisplayed: true});
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({formDisplayed: false});

    const formElements = event.target.elements;
      
    
    const newDataElement =
        {
            id: formElements.id.value,
            firstName: formElements.firstName.value,
            lastName: formElements.lastName.value,
            email: formElements.email.value,
            phone: formElements.phone.value
        }
    
    
    let newData = [...this.state.data];
    newData.unshift(newDataElement);

    this.setState({data: newData});

  }
    
  handleTableRowClick(event) {
    let element = event.target;
    while (element.tagName != 'TR'){
      if (element.hasAttribute("data-index")){
        break;
      };       
      element = element.parentNode;   
    }
      
    const localIndex = +element.getAttribute('data-index');   
    
    const newFocusedElement = this.state.data[20*(this.state.page-1)+localIndex];

    this.setState({
        focusedElement: newFocusedElement
    });
    
  }

  render() {
    return (
      <div onClick={this.handleButtonClick}>
        <h1>Table with data {this.state.isLoading ? 'and it is loading right now' : ''}</h1>
        <button className="short-list">Load short list</button>
        <button className="long-list">Load long list</button>
        <br />
        <button onClick={this.handleAddButtonClick}>Add</button>
        <br />
        
        <input
          type="text"
          placeholder="type in for search"
          onChange={this.handleSearchInputChange}
        />
        <PageSelector
          handlePageButtonClick={this.handlePageButtonClick}
          handlePageInputChange={this.handlePageInputChange}
          page={this.state.page}
        />
        <Table
          data={this.state.data}
          page={this.state.page}
          search={this.state.search}
          handleColumnClick={this.handleColumnClick}
          handleTableRowClick={this.handleTableRowClick}
        />
        <FocusedElement 
          focusedElement = {this.state.focusedElement}
          data = {this.state.data}
        />
        <InputForm 
          formDisplayed = {this.state.formDisplayed}
          formSubmit = {this.formSubmit}
        />
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.data

      .filter((item, index) => {
        let searchPattern = new RegExp(this.props.search, "i");

        for (let key in item) {

          let stringValue = "" + item[key];

          if (key == "adress" || key == "description") continue;

          if (stringValue.search(searchPattern) > -1) {
            return true;
          }
        }
        console.log("false item");
        return false;
      })
      .filter((item, index) => {
        const numOfElements = 20;
        if (
          index >= (this.props.page - 1) * numOfElements &&
          index <= this.props.page * numOfElements
        ) {
          return true;
        }

        return false;
      })
      .map((item, index) => {
        return ( 
          <tr key={index} data-index={index}>
            <th>{item.id}</th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        );
      });

    return (
      <table className="table table-hover">
        <thead>
          <tr onClick={this.props.handleColumnClick}>
            <th scope="col" data-click="id">
              id
            </th>
            <th scope="col" data-click="firstName">
              First Name
            </th>
            <th scope="col" data-click="lastName">
              Last Name
            </th>
            <th scope="col" data-click="email">
              email
            </th>
            <th scope="col" data-click="phone">
              phone
            </th>
          </tr>
        </thead>

        <tbody onClick={this.props.handleTableRowClick}>{items}</tbody>
      </table>
    );
  }
}

class PageSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav onClick={this.props.handlePageButtonClick}>
        <button data-page="previous">previous</button>
        <input
          type="number"
          className="page-input"
          value={this.props.page}
          onChange={this.props.handlePageInputChange}
        />
        <button data-page="next">next</button>
      </nav>
    );
  }
}

class FocusedElement extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    
      const element = this.props.focusedElement;
      
      return element.id ? 
        (<div>
            <p>First Name: {element.firstName}</p>
            <p>Last Name: {element.lastName}</p>
            <p>Email: {element.email}</p>
            <p>Phone: {element.phone}</p>
        </div>
        ) : null;
    }
}

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        
        
    }
    
    render() {
        return this.props.formDisplayed ? (
            <form className='modal-form' onSubmit={this.props.formSubmit}>
                <div className='form-group'>
                <label htmlFor='id'>
                    id
                </label>
                <input className='form-control' id='id' placeholder='id' type='number' />
                </div>
                <div className='form-group'>
                <label htmlFor='firstName'>
                    firstName
                </label>
                <input className='form-control' id='firstName' placeholder='First Name' type='text' />
                </div>
                <div className='form-group'>
                <label htmlFor='lastName'>
                    lastName
                </label>
                <input className='form-control' id='lastName' placeholder='Last Name' type='text' />
                </div>
                <div className='form-group'>
                <label htmlFor='email'>
                    email
                </label>
                <input className='form-control' id='email' placeholder='email' type='email' />
                </div>
                <div className='form-group'>
                <label htmlFor='phone'>
                    phone
                </label>
                <input className='form-control' id='phone' placeholder='phone' type='phone' />
                </div>
                
                
                <input type='submit' value='submit'/>
                
            </form>
        ) : null;
    }
}

ReactDOM.render(<MyApp />, document.querySelector('.table-container'));

