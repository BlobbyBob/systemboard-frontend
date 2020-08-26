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

import {apiCall, setAuthentication, unsetAuthentication} from './index';
import {Boulder, BoulderNew, BoulderSearch, Holds, Stats, Token, Wall} from './types';
import {RankingItemData} from '@/types/RankingItemData';

export async function loginPassword(email: string, password: string): Promise<boolean> {
    const qs = new URLSearchParams({
        'auth': password
    });
    setAuthentication('Login');
    const apiToken: Token | undefined = await apiCall('GET', '/login/password/' + encodeURIComponent(email) + '?' + qs.toString());
    if (!apiToken) return false;
    setAuthentication('Bearer ' + apiToken.token);
    return true;
}

export async function logout(): Promise<void> {
    return new Promise<void>((resolve => {
        if (sessionStorage.getItem('auth')?.toLowerCase().startsWith('bearer')) {
            apiCall('GET', '/logout').then(() => {
                unsetAuthentication();
                resolve();
            });
        } else {
            unsetAuthentication();
        }
    }));
}

export async function getWall(): Promise<Wall | undefined> {
    return apiCall('GET', '/wall');
}

export async function getHolds(wallid: number): Promise<Holds[] | undefined> {
    return apiCall('GET', '/holds/' + encodeURIComponent(wallid));
}

export async function getBoulder(id: number): Promise<Boulder | undefined> {
    return apiCall('GET', '/boulder/' + encodeURIComponent(id));
}

export async function getBoulderOfTheDay(): Promise<Boulder | undefined> {
    return apiCall('GET', '/boulderoftheday');
}

export async function searchBoulder(data: BoulderSearch): Promise<Boulder[] | undefined> {
    return apiCall('POST', '/search', data);
}

export async function newBoulder(data: BoulderNew): Promise<{ id: number } | undefined> {
    return apiCall('POST', '/boulder', data);
}

export async function getRanking(): Promise<RankingItemData[] | undefined> {
    return apiCall('GET', '/ranking');
}

export async function getStats(): Promise<Stats | undefined> {
    return apiCall('GET', '/stats');
}
