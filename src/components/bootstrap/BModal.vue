<!--
  -- systemboard
  -- Copyright (C) 2021 Ben Swierzy
  --
  -- This program is free software: you can redistribute it and/or modify
  -- it under the terms of the GNU General Public License as published by
  -- the Free Software Foundation, either version 3 of the License, or
  -- (at your option) any later version.
  --
  -- This program is distributed in the hope that it will be useful,
  -- but WITHOUT ANY WARRANTY; without even the implied warranty of
  -- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -- GNU General Public License for more details.
  --
  -- You should have received a copy of the GNU General Public License
  -- along with this program.  If not, see <https://www.gnu.org/licenses/>.
  --
  -->

<template>
  <div class="modal" :id="id" tabindex="-1">
    <div class="modal-dialog" :class="modalDialogClass">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="headerCloseLabel"></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="!hideFooter" class="modal-footer">
          <button v-if="!okOnly" type="button" class="btn btn-secondary">
            {{ cancelTitle }}
          </button>
          <button type="button" class="btn btn-primary" @click="bControls.hideModal(id)">{{ okTitle }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { bControls } from "@/plugins/BootstrapControls";

export default defineComponent({
  name: "BModal",
  props: {
    title: String,
    id: String,
    hideFooter: {
      type: Boolean,
      default: false,
    },
    okOnly: {
      type: Boolean,
      default: false,
    },
    okTitle: {
      type: String,
      default: "OK",
    },
    cancelTitle: {
      type: String,
      default: "Cancel",
    },
    headerCloseLabel: {
      type: String,
      default: "Close",
    },
    size: {
      type: String as () => "sm" | "md" | "lg" | "xl",
      default: "md",
    },
  },
  setup() {
    let bControls = {} as bControls;
    const x: bControls | undefined = inject("bControls");
    if (x !== undefined) {
      bControls = x;
    } else {
      console.warn("Plugin bControls missing");
    }
    return {
      bControls,
    };
  },
  computed: {
    modalDialogClass() {
      return {
        "modal-sm": this.size == "sm",
        "modal-lg": this.size == "lg",
        "modal-xl": this.size == "xl",
      };
    },
  },
});
</script>

<style lang="scss" scoped></style>
