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

import {apiCall, setAuthentication} from './index';
import {Holds, Token, Wall} from './types';

export async function loginPassword(email: string, password: string) {
    const qs = new URLSearchParams({
        'auth': password
    });
    setAuthentication('Login');
    const apiToken: Token = await apiCall('GET', '/login/password/' + encodeURIComponent(email) + '?' + qs.toString());
    console.log('API Call response:', apiToken);
    console.log('Saving session token:', apiToken.token);
    setAuthentication('Bearer ' + apiToken.token);
}

export async function getWall(): Promise<Wall> {
    return await apiCall('GET', '/wall');
}

export async function getHolds(wallid: number): Promise<Array<Holds>> {
    return await apiCall('GET', '/holds/' + wallid);
}

