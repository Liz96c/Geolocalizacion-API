document.querySelector("#MostrarInfo").style.display = "none";
const btnSearch=document.querySelector("#search-btn");

const searchIP = () => {

    const direccionIP=document.querySelector("#IP-input").value.trim();
    const url= `https://www.iplocate.io/api/lookup/${direccionIP}`;
    if (direccionIP === "") {
        document.querySelector("#MostrarInfo").style.display = "block";
        document.querySelector("#MostrarInfo").innerHTML = `<p style="color: red;">Ingresa una IP</p>`;
        return;
    }
    fetch(url,{
        headers: {
            'X-API-Key': 'dfd32091e572b37a3cfbd4cab269c488'
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Dirección IP no valida/encontrado");
        }
        return response.json();
    })
    .then(data => {
        showIP(data);
    
        
    })
    .catch(error => {
        document.querySelector("#MostrarInfo").innerHTML=`<p>${error.message}</p>`;
    });

    
};
document.querySelector("#IP-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault()
    searchIP();
  }
});

function showIP(ip){
    const IpInfo = document.querySelector("#MostrarInfo");
    IpInfo.innerHTML=`
    <h2>${ip.ip}</h2>
    <p><strong>Ciudad: </strong> ${ip.city}</p>
    <p><strong>Pais: </strong> ${ip.country} </p>
    <p><strong>Nomenglatura: </strong> ${ip.country_code}</p>
    <p><strong>Continente: </strong> ${ip.continent}</p>
    <p><strong>Zona horaria: </strong> ${ip.time_zone}</p>
    <p><strong>Lada: </strong> ${ip.calling_code}</p>
    <p><strong>Compañia: </strong> ${ip.company.name}</p>
    <p><strong>Dirección: </strong> ${ip.abuse.address}</p>
    <p><strong>email: </strong> ${ip.abuse.email}</p>
    <p><strong>telefono: </strong> ${ip.abuse.phone}</p>

    `;
    
}

btnSearch.addEventListener("click",searchIP);



