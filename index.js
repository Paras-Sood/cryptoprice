// https://api.coingecko.com/api/v3/simple/price?ids=BITCOIN&vs_currencies=USD
function getprice(){
    console.log("Called")
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=BITCOIN&vs_currencies=USD')
    .then(response=>response.json())
    .then(result=> {
        console.log(result.bitcoin)
        document.querySelector('#invField1').value=1
        document.querySelector('#invField2').value="$ "+String(result.bitcoin.usd)
        var bp=result.bitcoin.usd
        document.querySelector('#invField1').onkeyup = () => {
            let num=document.querySelector('#invField1').value
            if(num!='')
            {
                document.querySelector('#invField2').value="$ "+String(num*bp)
            }
        }
    })
}
document.addEventListener('DOMContentLoaded',function(){
    getprice()
    addgraph(1)
    setInterval(getprice,20000)
    document.querySelector('#numdays').onchange = function(){
        addgraph(this.value)
    }
})
function addgraph(days){
    let xValues=[]
    let yValues=[]
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`)
    .then(response=>response.json())
    .then(data=>{
        data.prices.forEach(price=>{
            xValues.push(new Date(price[0]).toLocaleDateString())
            yValues.push(price[1])
        })
        document.querySelector('#graph_div').innerHTML=""
        let canvas=document.createElement('canvas')
        canvas.id="graph"
        document.querySelector('#graph_div').append(canvas)
        new Chart("graph", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0.25,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "red",
                    data: yValues
                }]
            },
            options: {
                plugins:{   
                    legend: {
                        display: false
                        },
                    title: {
                        display: true,
                        text: "Bitcoin price in USD"
                    },
                },
                scales: {
                    xAxis: {
                        ticks: {
                            maxTicksLimit: 10,
                        },
                    },
                }
            }
        });
    })
}