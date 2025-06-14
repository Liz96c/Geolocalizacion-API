

const IpInput = document.getElementById("IP-input");
const btnSearch=document.querySelector("#search-btn");
document.querySelector("#MostrarInfo").style.display = "none";
const searchIP = () => {
    const direccionIP = IpInput.value.trim();
    
    if (direccionIP === "") {
        document.querySelector("#MostrarInfo").style.display = "block";
        document.querySelector("#MostrarInfo").innerHTML = `<p style="color: red;">Ingresa una IP</p>`;
        return;
        }
    
    const url= `https://www.iplocate.io/api/lookup/${direccionIP}`;
    fetch(url,{
        headers: {
            'X-API-Key': 'dfd32091e572b37a3cfbd4cab269c488'
        }
    })
    .then(response => {
        if(!response.ok){
            document.querySelector("#MostrarInfo").style.display = "block";
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


    function showIP(ip){
        document.querySelector("#MostrarInfo").style.display = "block";
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

document.querySelector("#IP-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchIP();
  }
});






