<template>
  <v-container>
      <!-- <div class="go-unit-container"> -->
  
    <!-- <v-row class="mx-3">
      <v-col cols="12" md="3" class="go-unit-tree px-3">
        <v-row>
          <v-col class="go-unit-head"></v-col>
        </v-row>
        <v-row v-for="(item, idx) in value" :key="item.id">
            <template v-if="idx == 0">
                <v-col class="go-unit-col">
                    <v-list-item dense class="px-0">
                    <v-list-item-icon>
                        <v-icon color="orange darken-2" v-if="item.head">mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="py-0">
                        <v-list-item-title
                        :title="
                            item.surname + ' ' + item.firstname + ' ' + item.middlename
                        "
                        >{{ item.surname }} {{ item.firstname }}
                        {{ item.middlename }}</v-list-item-title
                        >
                        <v-list-item-subtitle>{{ item.position }}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-col>
            </template>
            <template v-else>
                <v-col class="go-unit-col">
                    <v-list-item dense class="px-0">
                    <v-list-item-icon>
                        <v-icon color="orange darken-2" v-if="item.head"
                        >mdi-account</v-icon
                        >
                        <v-btn v-if="item.employes.length > 0" small icon>
                        <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-list-item-icon>
                    <v-list-item-content class="py-0">
                        <v-list-item-title
                        :title="
                            item.surname + ' ' + item.firstname + ' ' + item.middlename
                        "
                        >{{ item.surname }} {{ item.firstname }}
                        {{ item.middlename }}</v-list-item-title
                        >
                        <v-list-item-subtitle>{{ item.position }}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-col>
            </template>
          
        </v-row>
      </v-col>
      <v-col cols="12" md="9" class="go-unit-chart-months">
        <v-row>
          <v-col
            class="go-unit-head go-unit-months-col text-md-center white--text"
            v-for="month in months"
            :key="month"
            >{{ month }}</v-col
          >
        </v-row>
        <v-row v-for="item in value" :key="item.id">
          <v-col
            class="go-unit-col go-unit-months-col"
            v-for="month in months"
            :key="month"
          ></v-col>
        </v-row>
      </v-col>
    </v-row> -->
  <!-- </div> -->
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  })
</script>
