const servicesDOM = document.querySelector('.services-center');



class Services {
    async getServices() {
        try {
            let result = await fetch("services.json");
            console.log(result);
            let data = await result.json();
            let services = data.items;
            services = services.map( item => {
                const {title, des, cls} = item.fields;
                const id = item.sys;
                return {id, title, des, cls};
            });
            return services;
        } catch (error) {
            console.log(error);
        }
    }
}

class UI {
    displayServices(services) {
        let result = "";
        services.forEach(service => {
            result += `<div class="col-sm-4 service-card">
            <i class="${service.cls} " aria-hidden="true"></i>
            <h4 data-id=${service.id}>${service.title}</h4>
            <p>${service.des}</p>
          </div>`;
        });
        servicesDOM.innerHTML = result;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const services = new Services();
    services.getServices().then( services => {
        ui.displayServices(services);
    });
});