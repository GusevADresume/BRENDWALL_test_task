function sendForm(){
    
}






window.addEventListener("load", function() {
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(productForm);
        const postData = {
            name:formData.get('name'),
            description:formData.get('description'),
            price:formData.get('price'),
        }
        console.log(postData)
    })
  })