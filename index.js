// https://api.coingecko.com/api/v3/simple/price?ids=BITCOIN&vs_currencies=USD
document.addEventListener('DOMContentLoaded',function(){
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=BITCOIN&vs_currencies=USD')
    .then(response=>response.json())
    .then(result=> {
        console.log(result.bitcoin)
        document.querySelector('#invField1').value=1
        document.querySelector('#invField2').value=result.bitcoin.usd
        var bp=result.bitcoin.usd
        document.querySelector('#invField1').onkeyup = () => {
            let num=document.querySelector('#invField1').value
            if(num!='')
            {
                document.querySelector('#invField2').value=num*bp
            }
        }
    })
})