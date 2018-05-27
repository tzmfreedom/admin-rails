// Vue.component('quote-detail', {
//     props: ['detail'],
//     template: '<tr><td>{{ detail.item_name }}</td><td>{{ detail.amount }}</td><td>{{ detail.quantity }}</td></tr>'
// });

(function () {
    const POST_URL = '/admin/quotes';
    const FETCH_URL = '/admin/quotes/1.json';

    const CSRF_TOKEN = $('meta[name=csrf-token]').attr('content');


    var quote = { name: '', quoted_at: '', contact: '' };
    var details = [];

    var vm = new Vue({
        el: '#form',
        data: {
            quote: quote,
            details: details,
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
                var body = {
                    name: vm.quote.name,
                    quoted_at: vm.quote.quoted_at,
                    contact: vm.quote.contact,
                    quote_details: vm.details
                };
                fetch(POST_URL, {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': CSRF_TOKEN,
                    },
                    body: JSON.stringify(body),
                }).then(function(res) {
                    return res.json();
                }).then(function(r) {

                });
            }
        }
    });

    // initialize
    fetch(FETCH_URL, {
        credentials: 'same-origin',
    }).then(function(res) {
        return res.json();
    }).then(function(r) {
        vm.quote.name = r.name;
        vm.quote.quoted_at = r.quoted_at;
        vm.quote.contact = r.contact;

        vm.details = r.quote_details;
    });
})();
