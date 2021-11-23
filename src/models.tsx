import { formatDistance, formatDistanceToNow } from 'date-fns';
import { transliterate } from 'transliteration';

class Data {
  location?: Location;
  sleep?: Sleep;
  steps?: Steps;
  workout?: Workout;
  weight?: Weight;
  series?: Series;
  song?: Song;
  fuel?: Fuel;
  stories?: Stories;
  mood?: Mood;
}

class Location {
  id!: number;
  country!: string;
  locality?: string;

  static format(l: Location) {
    return l.locality ? `${l.locality}, ${l.country}` : l.country
  }
}

class Sleep {
  id!: number;
  start_date!: Date;
  end_date!: Date;

  static format(s: Sleep) {
    return `${formatDistance(new Date(s.end_date), new Date(s.start_date))} tonight`
  }
}

class Steps {
  id!: number;
  value!: number;

  static format(s: Steps) {
    return `${new Intl.NumberFormat().format(s.value)} today`
  }
}

class Weight {
  id!: number;
  value!: number;
  measured_at!: Date;

  static format(w: Weight) {
    return `${(w.value / 1000).toFixed(1)} kg ${formatDistanceToNow(new Date(w.measured_at), { addSuffix: true })}`
  }
}


class Workout {
  workout_id!: number;
  end_date!: Date;

  static format(w: Workout) {
    return formatDistanceToNow(new Date(w.end_date), { addSuffix: true })
  }
}

class Series {
  show!: Show;
  episode!: Episode;

  static format(s: Series) {
      return `${s.show.titleOriginal} – ${s.episode.shortName.toUpperCase()}`
  }
}

class Show {
  id!: number;
  titleOriginal!: string;
}

class Episode {
  id!: number;
  title!: string;
  shortName!: string;
}

class Song {
  id!: string;
  name!: string;
  artists!: Artist[];

  static format(s: Song) {
    let artist_names: string[] = []
    for (const artist of s.artists) {
      artist_names.push(artist.name)
    }
    return transliterate(artist_names.join(', ')) + " – " + transliterate(s.name)
  }
}

class Artist {
  id!: string;
  name!: string;
}

class Fuel {
    target!: Nutrients;
    current?: Nutrients;
    food_entries?: Food[];
}

class Nutrients {
    calories!: number;
    protein!: number;
    fat!: number;
    carbs!: number;
}

class Food {
    id!: number;
    name!: string;
    servingDescription!: string;

    static format(f: Food) {
        return transliterate(f.name)
    }
}



class Stories {

}

class Mood {
    rate!: number;
    name!: string;
    emoji!: string;
    created_at!: Date;

    static format(m: Mood) {
        return `${m.name} ${m.emoji}`
    }

    static formatDate(m: Mood) {
        return formatDistanceToNow(new Date(m.created_at), { addSuffix: true })
    }
}

export {
    Data,
    Location, Sleep, Steps, Weight, Workout, Food,
    Series, Show, Episode,
    Song, Artist,
    Mood, Stories
}
