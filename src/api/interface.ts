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
import {Boulder, BoulderNew, BoulderSearch, Holds, Token, Wall} from './types';
import {RankingItemData} from '@/types/RankingItemData';

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

export async function getHolds(wallid: number): Promise<Holds[]> {
    return await apiCall('GET', '/holds/' + wallid);
}

export async function getBoulder(id: number): Promise<Boulder> {
    return await apiCall('GET', '/boulder/' + id);
}

export async function getBoulderOfTheDay(): Promise<Boulder> {
    return await apiCall('GET', '/boulderoftheday');
}

export async function searchBoulder(data: BoulderSearch): Promise<Boulder[]> {
    return await apiCall('POST', '/search', data);
}

export async function newBoulder(data: BoulderNew): Promise<{ id: number }> {
    return await apiCall('POST', '/boulder', data);
}

export async function getRanking(): Promise<RankingItemData[]> {
    return new Promise<RankingItemData[]>((resolve) => resolve([{
        name: 'Mr. Doe',
        points: 123
    },
        {
            name: 'Ms. Doe',
            points: 45,
            icon: 'trophy',
            iconTooltip: 'Tooltip'
        }]));
}
