// Vue.component('quote-detail', {
//     props: ['detail'],
//     template: '<tr><td>{{ detail.item_name }}</td><td>{{ detail.amount }}</td><td>{{ detail.quantity }}</td></tr>'
// });

(function () {
    var quote = {
        name: '',
        quoted_at: '',
    };

    var vm = new Vue({
        el: '#form',
        data: {
            quote: quote,
            details: [],
            seen: false
        },
        methods: {
            addRow: function () {
                this.details.push({
                    item_name: '',
                    amount: 100,
                    quantity: 0,
                })
            },
            create: function() {

            }
        }
    });

    fetch('/admin/quotes/1.json', {
        credentials: 'include'
    }).then(function(){
        console.log(arguments);
    });
})();
