/*
 *  systemboard
 *  Copyright (C) 2020 Ben Swierzy
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

/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ProgressStatus } from "@//plugins/ProgressStatus";
import App from "@/App.vue";

const baseUrl = process.env.VUE_APP_API_URL;
const sessionStorage = window.sessionStorage;

let app: typeof App;

export interface ApiError {
  successfulTransmission: boolean;
  statusCode?: number;
  statusText?: string;
}

export function setApiVue(v: typeof App): void {
  app = v;
}

export function setAuthentication(authentication: string): void {
  sessionStorage.setItem("auth", authentication);
}

export function unsetAuthentication(): void {
  sessionStorage.removeItem("auth");
}

function errorHandler(reason: ApiError) {
  if (reason.successfulTransmission) {
    if (reason.statusCode == 403) {
      if (!app.isGuest) {
        app.toast.error("Du hast keine Berechtigung diese Aktion durchzuführen.");
      } else {
        app.toast.info("Diese Funktion steht nur angemeldeten Nutzern zur Verfügung");
      }
    } else {
      app.toast.error(`Es ist ein Fehler aufgetreten.`);
      console.error(`${reason.statusCode} ${reason.statusText}`);
    }
  } else {
    app.toast.warning("Keine Internetverbindung");
  }
  return undefined;
}

export async function apiCall(
  method: string,
  endpoint: string,
  successMsg?: string,
  data?: any
): Promise<any | undefined> {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, baseUrl + endpoint);
    app.progress(ProgressStatus.START);
    const auth = sessionStorage.getItem("auth");
    if (auth != null) {
      xhr.setRequestHeader("Authorization", auth);
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        app.progress(ProgressStatus.PROGRESS);
        const contentType = xhr.getResponseHeader("Content-Type");
        if (contentType != null && contentType.indexOf("application/json") != -1) {
          xhr.responseType = "json";
        }
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
        app.progress(ProgressStatus.FINISH);
        setTimeout(() => {
          app.progress(ProgressStatus.DONE);
        }, 200);

        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.response);
          if (successMsg) {
            app.toast.success(successMsg);
          }
        } else {
          const error: ApiError = {
            successfulTransmission: true,
            statusCode: xhr.status,
            statusText: xhr.statusText,
          };
          if (error.statusCode == 0) error.successfulTransmission = false;
          reject(error);
        }
      }
    };
    xhr.onerror = () => {
      const error: ApiError = {
        successfulTransmission: false,
      };
      reject(error);
    };
    if (data != undefined) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  }).catch(errorHandler);
}
