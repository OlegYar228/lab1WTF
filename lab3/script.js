let cars = [
  { marka: 'Ford', model: 'Musstang', country: 'Usa', color: 'red', power: 323 },
  { marka: 'Nissan', model: 'Maxima', country: 'Japan', color: 'blue', power: 149 },
  { marka: 'Vaz', model: '2101', country: 'USSR', color: 'white', power: 70 },
];
let cols = ['marka', 'model', 'country', 'color', 'power'];
let masscounter = 3;

function addElem() {
  let tr = document.createElement("tr");
  let i = 0;
  cars.push();
  console.log(cars);
  let carsobj = {};
  for (let c = 0; c < cols.length; c++) {
    let td = document.createElement("td");
    td.textContent = document.getElementById(cols[i]).value;
    carsobj[cols[i]] = document.getElementById(cols[i]).value;
    console.log(carsobj);
    tr.appendChild(td);
    i++;
  }
  cars[masscounter] = carsobj;
  masscounter++;
  console.log(cars);
  document.getElementById('dest').appendChild(tr);
  sort();
  edit()
}

function tabletOnload() {
  for (let i = 0; i < cars.length; i++) {
    let tr = document.createElement("tr");
    for (let c = 0; c < cols.length; c++) {
      let td = document.createElement("td");
      td.textContent = cars[i][cols[c]];
      tr.appendChild(td);
    }
    document.getElementById('dest').appendChild(tr);
  }
  sort();
  edit();
}



function edit() {
  let elementList = document.getElementsByClassName("editw");
  let trs = document.getElementsByTagName('tr');
  let btn = document.getElementById('elem_edit');
  let btndelete = document.getElementById('delete');
  let cols = ['marka_e', 'model_e', 'country_e', 'color_e', 'power_e'];

  for (let i = 1; i < trs.length; i++) {
    trs[i].onclick = function () {
      console.log(this);
      let elemd = this;
      let tds = this.getElementsByTagName('td');
      let trs_transform = this.innerHTML.replace(/<td>/g, '')
      let trs_arr = trs_transform.split('</td>');
      for (let x = 0; x < elementList.length; x++) {
        elementList[x].value.innerHTML = trs_arr[x];
        document.getElementById(elementList[x].id).value = trs_arr[x];
      }
      document.querySelector('.edit_open').click();
      btn.addEventListener('click', function () {
        console.log('edit save');
        let x = 0;
        for (let c = 0; c < cols.length; c++) {
          tds[c].innerHTML = document.getElementById(cols[c]).value;
          x++;
        }
        tds = 0;
      });
      btndelete.addEventListener('click', function () {
        console.log(elemd)
        let Confirm = confirm('Вы уверены что хотите удалить элемент?')
        if (Confirm) {
          console.log(elemd)

          elemd.remove();
          edit();

          document.querySelector('.modal__close2').click();
        } else { edit(); }
      });
    }

  }
}

function sort() {
  let table = document.getElementById('sortable');
  let headers = table.querySelectorAll('th');
  let tableBody = table.querySelector('tbody');
  let rows = tableBody.querySelectorAll('tr');

  let directions = Array.from(headers).map(function (header) {
    return '';
  });

  let transform = function (index, content) {
    let type = headers[index].getAttribute('data-type');
    switch (type) {
      case 'number':
        return parseFloat(content);
      case 'string':
      default:
        return content;
    }
  };

  let sortColumn = function (index) {

    let direction = directions[index] || 'asc';

    let multiplier = (direction === 'asc') ? 1 : -1;

    let newRows = Array.from(rows);

    newRows.sort(function (rowA, rowB) {
      let cellA = rowA.querySelectorAll('td')[index].innerHTML;
      let cellB = rowB.querySelectorAll('td')[index].innerHTML;

      let a = transform(index, cellA);
      let b = transform(index, cellB);

      switch (true) {
        case a > b: return 1 * multiplier;
        case a < b: return -1 * multiplier;
        case a === b: return 0;
      }
    });

    [].forEach.call(rows, function (row) {
      tableBody.removeChild(row);
    });

    directions[index] = direction === 'asc' ? 'desc' : 'asc';

    newRows.forEach(function (newRow) {
      tableBody.appendChild(newRow);
    });
  };

  [].forEach.call(headers, function (header, index) {
    header.addEventListener('click', function () {
      sortColumn(index);
    });
  });
}

function tableSearch() {
  let phrase = document.getElementById('search-text');
  let table = document.getElementById('sortable');
  let regPhrase = new RegExp(phrase.value, 'i');
  let flag = false;
  for (let i = 1; i < table.rows.length; i++) {
    flag = false;
    for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[0].innerHTML);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }

  }
}

const modalController = ({ modal, btnOpen, btnClose }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${300}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
    ) {

      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      }, 300);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.add',
  btnOpen: '.modal_add',
  btnClose: '.modal__close',
});

modalController({
  modal: '.edit',
  btnOpen: '.edit_open',
  btnClose: '.modal__close2',
});