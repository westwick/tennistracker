<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>String Tracker</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          
        >
          <v-flex text-xs-center>
            <div>
              <v-toolbar flat color="#CCCCCC">
                <v-toolbar-title>Recent</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.member_name" label="Member Name"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.member_id" label="Member Number"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.racquet" label="Racquet"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.string_type" label="String Type"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.tension" label="Tension"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.entered_by" label="Entered By"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.member_name }}</td>
                  <td class="text-xs-right">{{ props.item.member_id }}</td>
                  <td class="text-xs-right">{{ props.item.racquet }}</td>
                  <td class="text-xs-right">{{ props.item.string_type }}</td>
                  <td class="text-xs-right">{{ props.item.tension }}</td>
                  <td class="text-xs-right">{{ props.item.entered_by }}</td>
                  <td class="text-xs-right">{{ props.item.created_at }}</td>
                  <td class="justify-center layout px-0">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(props.item)"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(props.item)"
                    >
                      delete
                    </v-icon>
                  </td>
                </template>
                <template slot="no-data">
                  <v-btn color="primary">WATT</v-btn>
                </template>
              </v-data-table>
            </div>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { db } from './firestore';

export default {
  name: 'Home',
  data() {
    return {
      drawer: false,
      items: [],
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Member Name',
          align: 'left',
          sortable: true,
          value: 'member_name'
        },
        { text: 'Member Number', value: 'member_id' },
        { text: 'Racquet', value: 'racquet' },
        { text: 'String Type', value: 'string_type' },
        { text: 'Tension', value: 'tension' },
        { text: 'Entered By', value: 'entered_by' },
        { text: 'Date', value: 'created_at' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        member_name: '',
        member_id: 0,
        racquet: '',
        string_type: '',
        tension: '',
        entered_by: '',
        created_at: ''
      },
      defaultItem: {
        member_name: '',
        member_id: 0,
        racquet: '',
        string_type: '',
        tension: '',
        entered_by: '',
        created_at: ''
      }
    }
  },
  firestore() {
    return {
      items: db.collection('restring_events'),
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Entry' : 'Edit Entry'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.$firestore.items.doc(item['.key']).delete();
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.$firestore.items.doc(this.editedItem['.key']).update({
          member_name: this.editedItem.member_name,
          member_id: this.editedItem.member_id,
          racquet: this.editedItem.racquet,
          string_type: this.editedItem.string_type,
          tension: this.editedItem.tension,
          entered_by: this.editedItem.entered_by,
          created_at: this.editedItem.created_at
        });
      } else {
        this.$firestore.items.add(this.editedItem);
      }
      this.close()
    }
  }
}
</script>

<style lang="scss">
// @import './assets/main.css';
</style>