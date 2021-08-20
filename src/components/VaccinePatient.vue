<template>
  <div>
    <div v-for="patient in patients" :key="patient.givenName">
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4 text-wrap">
              <span v-if="dataValidated">
                {{ $t("verifiedQRCode") }}
              </span>
              <span v-else>
                <v-chip class="ma-2" color="red" text-color="white">
                  <h6>{{ $t("nonVerifiedQRCode") }}</h6>
                </v-chip>
              </span>
              <v-btn
                width="20"
                height="20"
                class="mx-2"
                outlined
                fab
                dark
                @click="showValidationDialog = trueeeeee"
                x-small
                color="grey lighten-1"
              >
                ?
              </v-btn>
            </div>
            <v-list-item-title class="text-h5 mb-1">
              {{ patient.givenName }} {{ patient.familyName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <div>
                {{ patient.gender == undefined ? '': $t(patient.gender.toLowerCase())+', ' }} {{ $t("born") }}
                {{ patient.birthDate }}
              </div>
              <div>
                <strong>{{
                  $t("receivedDoses", {
                    dosesCount: patient.vaccineEvents.length,
                  })
                }}</strong>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80">
            <font-awesome-icon
              icon="check"
              size="lg"
              :color="dataValidated && patient.vaccineEvents.length >= 2 ? 'green' : 'orange'"
              transition="scale-transition"
              fixed-width
          /></v-list-item-avatar>
        </v-list-item>
        <v-card-text>
          <strong>{{ $t("dosesDetails") }}</strong>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(vaccineEvent, index) in patient.vaccineEvents"
              :key="index"
              color="green"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t("doseNumberX") }} {{ index + 1 }}</strong
                  ><br />
                  <div>
                    {{ $t("date") }}:
                    {{ new Date(vaccineEvent.date).toDateString() }}
                  </div>
                  <div>{{ $t("place") }}: {{ vaccineEvent.place }}</div>
                  <div>{{ $t("type") }}: {{ vaccineEvent.type }}</div>
                  <div>{{ $t("lotNumber") }}: {{ vaccineEvent.lotNumber }}</div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions>
          <div>
            <v-dialog v-model="showRawDataDialog">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  rounded
                  color="grey"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ $t("seeRawData") }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  {{ $t("qrCodeRawData") }}
                </v-card-title>

                <v-card-text>
                  <tree-view
                    :data="rawData"
                    :options="{ maxDepth: 20 }"
                  ></tree-view>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="showRawDataDialog = false"
                  >
                    {{ $t("close") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="showValidationDialog">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  {{ $t("qrCodeValidationInformation") }}
                </v-card-title>

                <v-card-text>
                  <div class="my-5">
                    {{ $t("followingPublicKeyVerified") }}:
                  </div>
                  <tree-view
                    :data="publicKey"
                    :options="{ maxDepth: 20 }"
                  ></tree-view>
                  <div class="my-5">
                    <a
                      href="https://spec.smarthealth.cards/#signing-health-cards"
                      >{{ $t("moreProtocolInformation") }}</a
                    >
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="showValidationDialog = false"
                  >
                    {{ $t("close") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script src="./VaccinePatient.js"></script>
