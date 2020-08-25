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

const baseUrl = 'http://api.systemboard.local';
const sessionStorage = window.sessionStorage;

export interface ApiError {
    successfulTransmission: boolean;
    statusCode?: number;
    statusText?: string;
}

export function setAuthentication(authentication: string) {
    sessionStorage.setItem('auth', authentication);
}

export function unsetAuthentication() {
    sessionStorage.removeItem('auth');
}

// eslint-disable-next-line
export async function apiCall(method: string, endpoint: string, data?: any): Promise<any|undefined> {
    // eslint-disable-next-line
    return new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, baseUrl + endpoint);
        const auth = sessionStorage.getItem('auth');
        if (auth != null) {
            xhr.setRequestHeader('Authorization', auth);
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                const contentType = xhr.getResponseHeader('Content-Type');
                if (contentType != null && contentType.indexOf('application/json') != -1) {
                    xhr.responseType = 'json';
                }
            } else if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr.response);
                } else {
                    const error: ApiError = {
                        successfulTransmission: true,
                        statusCode: xhr.status,
                        statusText: xhr.statusText
                    };
                    reject(error);
                }
            }
        };
        xhr.onerror = () => {
            const error: ApiError = {
                successfulTransmission: false
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

function errorHandler(reason: ApiError) {
    if (reason.successfulTransmission) {
        alert(`${reason.statusCode} ${reason.statusText}`);
    } else {
        alert(`No connection`);
    }
    return undefined;
}
