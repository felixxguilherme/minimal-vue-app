var modal = Vue.component('modal', {

    data() {
        return {
        }
    },

    props: [],

    template:
    `
    <div class="dialogbox__background">

        <div class="dialogbox">

            <header class="dialogbox__header">
                <button class="dialogbox__button_close" @click="close">
                    x
                </button>
            </header>

            <main class="dialogbox__body">
                <slot></slot>
            </main>

            <footer class="dialogbox__footer">
                <button class="dialogbox__button_save" @click="save">
                    salvar
                </button>
                <button class="dialogbox__button_cancel" @click="cancel">
                    cancelar
                </button>
            </footer>
        </div>
    </div>    
    `,

    methods: {
        close() {
            this.$emit('close')
        },
        save() {
            this.$emit('save')
        },
        cancel() {
            this.$emit('cancel')
        }
    }
})



new Vue({
    el:'#app',
    components: {
        modal: modal
    },

    data: {
        
        isModalVisible: false,

        saveActive: false,

        contato: {},

        errors: [],

        contatos: [
            {
                id: 1,
                nome: 'Zé',
                telefone: '61984538888'
            },
            {
                id: 2,
                nome: 'Alana',
                telefone: '61984538888'
            },
            {
                id: 3,
                nome: 'Pedro',
                telefone: '61984538888'
            },
            {
                id: 4,
                nome: 'Bárbara',
                telefone: '61984538888'
            }
        ]
    },

    methods: {

        editItem(item) {

            this.isModalVisible = true
            this.errors = []
            this.contato.id = item.id
            this.contato.nome = item.nome
            this.contato.telefone = item.telefone
        },
        
        deleteItem(item) {
            let idx = this.contatos.indexOf(item)
            this.contatos.splice(idx, 1);
        },

        saveItem(item) {
            const exists = this.contatos.find(element => element.id == item.id)
            if(!exists) {
                item.id = this.contatos.length + 1;
                this.contatos.push(item)      
            } else {
                var idx = this.contatos.findIndex(el => el.id == item.id)
                // this.validateInput()
                this.contatos[idx].nome = item.nome
                this.contatos[idx].telefone = item.telefone                
            }            
            this.isModalVisible = false
        },        
        
        showModal() {
            this.isModalVisible = true            
        },

        closeModal() {
            this.isModalVisible = false
            this.contato = {}
        },
        
        validateInput(e) {

            this.errors = []

            if(!this.contato.nome){
                this.errors.push('Nome é necessário')
            }
            if(this.contato.nome.length < 3) {
                this.errors.push('Nome precisa ter 3 letras ou mais.')
            }
            if(!this.contato.telefone) {
                this.errors.push('Telefone é necessário')
            }

            if (this.contato.telefone.length > 11) {
                this.errors.push('Telefone mto grande')
            }

            if(this.contato.telefone.length < 10 ) {
                this.errors.push('Telefone muito curto')
            }

            e.preventDefault()

            
            
        }
    },

    computed: {  
    },

    filters: {
        celNumber(val) {
            var arr = val.split('')          
            arr.splice(0, 0, '(')
            arr.splice(3, 0, ') ')
            arr.splice(9, 0, '-')
            var res = arr.join('')
            return res
        }
    }
})