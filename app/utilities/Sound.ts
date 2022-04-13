import { Audio, AVPlaybackStatus } from 'expo-av';
import logger from '../../store/middleware/logger';
import audio from '../assets/audio/yoruba';

export class Sound {
  #audio: { sound: Audio.Sound; status: AVPlaybackStatus; } | undefined;
  #defaultTime = 5000;
  url = '';

  async init() {
    this.#audio = await Audio.Sound.createAsync(audio.b);
  }

  async stop() { 
    if(!this.#audio) return
    try { await this.#audio.sound.stopAsync(); } 
    catch (error) { console.log('error', error); }
  }

  async playLocal(soundFile: any) {
    try {
      this.#audio = await Audio.Sound.createAsync(soundFile);
      (await this.#audio).sound.playAsync();
    } catch (error) { console.log('error', error); }
  };

  start(url: string) {
    this.play(url);
  }

  async play(url: string) {
    await this.stop();
    const soundFile = audio[url.toLowerCase().replaceAll('?', '')];
    
    if (!soundFile) return console.log(url + ': audio not found!');
    this.url = url;
    try { 
      this.#audio = await Audio.Sound.createAsync(soundFile);
      const duration = this.#audio.status.isLoaded ? this.#audio.status.durationMillis || this.#defaultTime : this.#defaultTime
      await this.playDelay(duration);
    } 
    catch (error) { console.log('error', error); }
    
    // await this.playLocal(soundFile);
    // this.stop();
    // this.#audio = new Audio.Sound();
    // this.url = url;
    // // const soundFile = audio[url];
    // console.log("Okay");
    // await this.#audio.loadAsync(soundFile);
    // const duration = this.getDuration(this.#audio);
    // await this.playDelay(duration);
  }
  // getDuration(audio: Audio): number { return audio.getDuration(); }
  playDelay(delay: number): Promise<void> {
    return new Promise(async(resolve) => {
      this.#audio?.sound.playAsync();
      setTimeout(() => resolve(), delay);
    });
  }
}

const sound = new Sound();
sound.init();

export default sound;
