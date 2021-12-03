/*
 *  systemboard
 *  Copyright (C) 2021 Ben Swierzy
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { App } from "vue";
import { Collapse, Modal } from "bootstrap";

export interface bControls {
  showModal(id: string): void;
  hideModal(id: string): void;
  showCollapse(id: string): void;
  hideCollapse(id: string): void;
  toggleCollapse(id: string): void;
}

const bControls = {
  showModal(id: string): void {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;
    let modal = Modal.getInstance(modalElement);
    if (!modal) {
      modal = new Modal(modalElement);
    }
    modal?.show();
  },

  hideModal(id: string): void {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;
    let modal = Modal.getInstance(modalElement);
    if (!modal) {
      modal = new Modal(modalElement);
    }
    modal?.hide();
  },

  showCollapse(id: string): void {
    const collapseElement = document.getElementById(id);
    if (!collapseElement) return;
    let collapse = Collapse.getInstance(collapseElement);
    if (!collapse) {
      collapse = new Collapse(collapseElement);
    }
    collapse?.show();
  },

  hideCollapse(id: string): void {
    const collapseElement = document.getElementById(id);
    if (!collapseElement) return;
    let collapse = Collapse.getInstance(collapseElement);
    if (!collapse) {
      collapse = new Collapse(collapseElement);
    }
    collapse?.hide();
  },

  toggleCollapse(id: string): void {
    const collapseElement = document.getElementById(id);
    if (!collapseElement) return;
    let collapse = Collapse.getInstance(collapseElement);
    if (!collapse) {
      collapse = new Collapse(collapseElement);
    }
    collapse.toggle();
  },
};

export default {
  install(app: App): void {
    app.provide("bControls", bControls);
  },
};
