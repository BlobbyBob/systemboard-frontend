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

export interface Token {
  token: string;
  privileged: boolean;
}

export interface Wall {
  id: number;
  name: string;
  wallSegments: Array<{ image: string }>;
}

export interface Holds {
  filename: string;
  holds: Hold[];
}

export interface Hold {
  id: number;
  tag: string;
  attr: string;
}

export interface Boulder {
  id: number;
  name: string;
  description: string;
  creator: {
    id: number;
    name: string;
  };
  ascents: number;
  climbed: boolean;
  grade: number;
  rating: number;
  deletable: boolean;
  location?: {
    min: number;
    main: number;
    max: number;
  };
  holds?: { [id: number]: 1 | 2 };
}

export interface BoulderNew {
  name: string;
  grade: number;
  stars: number;
  holds: {
    id: number;
    type: number;
  }[];
  description?: string;
}

export interface BoulderSearch {
  name?: string;
  creator?: string;
  creatorId?: number;
  minGrade?: number;
  maxGrade?: number;
  minRating?: number;
  maxRating?: number;
  notDoneYet?: boolean;
  page?: number;
  items?: number;
}

export interface SearchResults {
  pages: number;
  results: Boulder[];
}

export interface Stats {
  version: string;
  changelog: {
    version: string;
    date: string;
    description: string;
    changes: string[];
  }[];
}

export interface Registration {
  name: string;
  email: string;
  password: string;
}

export interface Ranking {
  id: number;
  name: string;
  badge: string;
  score: number;
}

export interface Climbed {
  climbed: boolean;
}

export interface Vote {
  rating?: number;
  grade?: number;
}
