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

import { apiCall, setAuthentication, unsetAuthentication } from "./index";
import {
  Boulder,
  BoulderNew,
  BoulderSearch,
  Climbed,
  EditorHold,
  Holds,
  Ranking,
  Registration,
  SearchResults,
  Stats,
  Token,
  Vote,
  Wall,
} from "./types";

export async function loginPassword(email: string, password: string): Promise<boolean> {
  const qs = new URLSearchParams({
    auth: password,
  });
  setAuthentication("Login", false);
  // todo change apiCall to POST (also in the backend)
  const apiToken: Token | undefined = await apiCall(
    "GET",
    "/login/password/" + encodeURIComponent(email) + "?" + qs.toString()
  );
  if (!apiToken) return false;
  setAuthentication("Bearer " + apiToken.token, apiToken.privileged);
  return true;
}

export async function logout(): Promise<void> {
  return new Promise<void>((resolve) => {
    if (sessionStorage.getItem("auth")?.toLowerCase().startsWith("bearer")) {
      apiCall("GET", "/logout", "Abgemeldet").then(() => {
        unsetAuthentication();
        resolve();
      });
    } else {
      unsetAuthentication();
    }
    resolve();
  });
}

export async function getWall(): Promise<Wall | undefined> {
  return apiCall("GET", "/wall");
}

export async function getHolds(wallid: number): Promise<Holds[] | undefined> {
  return apiCall("GET", "/holds/" + encodeURIComponent(wallid));
}

export async function getBoulder(id: number): Promise<Boulder | undefined> {
  return apiCall("GET", "/boulder/" + encodeURIComponent(id));
}

export async function getBoulderOfTheDay(): Promise<Boulder | undefined> {
  return apiCall("GET", "/boulderoftheday");
}

export async function searchBoulder(data: BoulderSearch): Promise<SearchResults | undefined> {
  return apiCall("POST", "/search", undefined, data);
}

export async function newBoulder(data: BoulderNew): Promise<{ id: number } | undefined> {
  return apiCall("POST", "/boulder", "Boulder gespeichert", data);
}

export async function deleteBoulder(id: number): Promise<void | undefined> {
  return apiCall("DELETE", "/boulder/" + encodeURIComponent(id), "Boulder gelöscht");
}

export async function postRegistration(data: Registration): Promise<void | undefined> {
  return apiCall("POST", "/registration", "Eine Aktivierungsmail wurde verschickt", data);
}

export async function getRanking(): Promise<Ranking[] | undefined> {
  return apiCall("GET", "/ranking");
}

export async function getStats(): Promise<Stats | undefined> {
  return apiCall("GET", "/stats");
}

export async function putClimbed(id: number, climbed: Climbed): Promise<void | undefined> {
  return apiCall("PUT", "/boulder/" + encodeURIComponent(id) + "/climbed", "Gespeichert", climbed);
}

export async function putBoulderOfTheDay(climbed: Climbed): Promise<void | undefined> {
  return apiCall("PUT", "/boulderoftheday/climbed", "Gespeichert", climbed);
}

export async function putVote(id: number, vote: Vote): Promise<void | undefined> {
  return apiCall("PUT", "/boulder/" + encodeURIComponent(id) + "/vote", "Gespeichert", vote);
}

export async function getHold(id: number): Promise<void | undefined> {
  return apiCall("GET", "/editor/hold/" + encodeURIComponent(id));
}

export async function postHold(hold: EditorHold & { wallSegment: number }): Promise<void | undefined> {
  return apiCall("POST", "/editor/hold", undefined, hold);
}

export async function putHold(id: number, hold: EditorHold): Promise<void | undefined> {
  return apiCall("PUT", "/editor/hold/" + encodeURIComponent(id), undefined, hold);
}

export async function deleteHold(id: number): Promise<void | undefined> {
  return apiCall("DELETE", "/editor/hold/" + encodeURIComponent(id));
}
