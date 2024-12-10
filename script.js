const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items;

btnNew.onclick = () => {
    if (descItem.value === "" || amount.value === "" || type.value === "") {
      return alert("Preencha todos os campos!");
    }
  
    const data = {
      desc: descItem.value,
      amount: Math.abs(amount.value).toFixed(2),
      type: type.value,
    };
  
    fetch('http://localhost:3000/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      alert('Item adicionado com sucesso!');
      descItem.value = "";
      amount.value = "";
      loadItens(); // Atualize a lista de itens
    })
    .catch(error => {
      console.error('Erro ao adicionar item:', error);
    });
  };
  