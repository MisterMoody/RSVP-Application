/* 
DOMContentLoaded Event-Handler Used to Force Browser to WAIT for JS Code to Run 
*/
document.addEventListener('DOMContentLoaded', () => {
                          
  /*  GLOBAL VARIABLES  */
  const form = document.getElementById('signUp');
  const input = form.querySelector('input');          //  STOREs 'input.value' in Form
  
  const mainDiv = document.querySelector('.main');    //  SETs 'Filter'
  const ul = document.getElementById('invitees');     //  SELECTs <ul> with id="invitees"
  
  const div = document.createElement('div');          //  CREATEs 'Filter' <div>
  const filterLabel = document.createElement('label');//  CREATEs 'Filter' <label>
  const filterCheckBox = document.createElement('input');//  CREATEs 'Filter' <checkbox>
  
  filterLabel.textContent = "Hide unconfirmed guest"; //  SET <label> 'textContent'
  filterCheckBox.type = 'checkbox';                   //  SET <checkbox> type
  div.appendChild(filterLabel);                       //  APPEND <label> to <div>
  div.appendChild(filterCheckBox);                    //  APPEND <checkbox> to <div>
  mainDiv.insertBefore(div, ul);                      //  INSERT 'Filter <div> above <ul>
  /*  EVENT HANDLER:  'Filter' Checkbox TOGGLER */
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;               //  STOREs 'input.value'
    const lis = ul.children;                          //  REFERENCEs <li>
    /* Conditional: Respondee or Non-Respondent */
    if (isChecked) {
      for (let i = 0; i < lis.length; i += 1) {       //  LOOPs through 'Respondents'
        let li = lis[i];                              //  Represents Individual <li>
        if (li.className === 'responded') {           //  Checks if <li> class is 'responded'
          li.style.display = '';                      //  Allows for original CSS
        } else {
          li.style.display = 'none';                
        }
      }  
    } else {
      for (let i = 0; i < lis.length; i += 1) {       //  LOOPs through 'Non-Respondents'
        let li = lis[i];  
        li.style.display = '';                        //  Style for 'non-respondent' <li>
      }
    }
  });
  
  /*  MAIN FUNCTION:  <LABEL> Confirming Registration + <BUTTON> to 'Remove' Registrant */
    /* Registrant 'Input Field' */
  function createLI(text){
    /*  */
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);      //  CREATEs <span>
      element[property] = value;                          //  ACCESS 'property' 
      return element;
    }
    /* Function to 'Append' <li>*/
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);      //  CREATEs <span>
      li.appendChild(element);                             //  APPENDs <span> to <li>  
      return element;
    }
    const li = document.createElement('li');          //  CREATEs <li> for Registrant  
    appendToLI('span', 'textContent', text);          //  Checkbox  =>  APPENDs <label> to <checkbox>
    //  APPENDS <label> to <li> + 'child' to <label> 
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'Edit');      //  'Edit' Button    => APPENDs <input> to <label>
    appendToLI('button', 'textContent', 'Remove');    //  'Removal' Button => APPENDs <input> to <label>
    return li;                                        //  RETURN <li>
  }
  
  /*  EVENT HANDLER:  Registrant 'Input Field' [Will 'Display' Registrant Input] */
  form.addEventListener('submit', (e) => {
    e.preventDefault();                               //  *REQUIRED* Prevents Browser Refreshing
    /*  */
    const text = input.value;                         //  STOREs 'input.value' from <text> field
    input.value = '';                                 //  CLEARs 'input.value' from <input> Field
    const li = createLI(text);  
    /*  */
    ul.appendChild(li);                               //  APPENDs any created <li> within the <ul>
  });
  
  /*  EVENT HANDLER:  'Confirmation' Checkbox  */
  ul.addEventListener('change', (e) => {  
    const checkbox = event.target;                    //  'Checkbox' Reference (true/false)
    const checked = checkbox.checked;                 //  STOREs 'Checkbox' Value
    const listItem = checkbox.parentNode.parentNode;  //  Reference <li> to TRAVERSE to <label> + <li>
    /*  */
    if (checked) { listItem.className = 'responded';  //  Confirmed (Responded)
    } else { listItem.className = '';                 //  Unconfirmed (Unresponded)
    };
  });
  
  /*  EVENT HANDLER:  'Removal + Edit + Save' Buttons  */
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON'){
      const button = e.target;
      const li = e.target.parentNode;                 //  Reference <li> for 'Removal'
      const ul = li.parentNode;                       //  TRAVERSE <li> parentNode for 'Removal'
      /*  OBJECT that 'Stores' Functions  */
      const nameActions = {
        remove: () => {
          ul.removeChild(li);                           //  REMOVEs <li> destined for 'Removal' 
        },
        edit: () => {
          const span = li.firstElementChild;            //  SELECT <span>
          const input = document.createElement('input');//  CREATEs <input> to 'Replace' <span>
          input.type = 'text';                          //  CONFIGURED to be a 'text' <input>
          input.value = span.textContent;               //  SETs <input> value to <span> 'textContent'
          li.insertBefore(input, span);                 //  USE <span> to PLACE new <input> into DOM
          li.removeChild(span);                         //  REMOVEs 'original' <span> 'text'
          button.textContent = 'Save';                  //  SETs button 'text' to display 'Save'
        },
        save: () => {
          const input = li.firstElementChild;           //  SELECT <span>
          const span = document.createElement('span');  //  CREATEs <input> to 'Replace' <span>
          span.textContent = input.value;               //  SET 'textContent' to <input> Value
          li.insertBefore(span, input);                 //  APPEND <span> before <input>
          li.removeChild(input);                        //  REMOVEs <input>
          button.textContent = 'Edit';                  //  RESET button 'text' to display 'Edit'        
        }
      };
     
      /* Conditional Statement to CALL FUNCTIONS*/
      if (button.textContent === 'Remove') {          //  REMOVE Registrant Name
        nameActions.remove();
      } else if (button.textContent === 'Edit') {     /*  EDIT REGISTRANT NAME  */
        nameActions.edit();
      } else if (button.textContent === 'Save') {     /*  SAVE modified REGISTRANT NAME */
        nameActions.save();
      }
    }
  });
});


//  TEST 'if' JavaScript Code Works:    console.log('Hello Mister Moody');