import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = false;
  isUploading = false;
  private ffmpeg;
  constructor() {
    this.ffmpeg = createFFmpeg({ log: true }); // log: true to see logs in console
  }

  async load() {
    if (this.isReady) return;
    await this.ffmpeg.load();
    this.isReady = true;
  }
  screenShort_urls: string[] = [];
  getScreenshot = async (file: File) => {
    this.isUploading = true;
    const data = await fetchFile(file); //! convert the file to binary data
    const file_name = file.name.split('.')[0]; //! get the file name

    this.ffmpeg.FS('writeFile', file_name, data); //! write the binary data to the file system

    const time_stamp_seconds = [1, 2, 3];
    const commands: string[] = [];

    time_stamp_seconds.forEach((time) => {
      commands.push(
        // ! Input
        '-i',
        file_name,
        // ! Output Options
        '-ss', //! config current timestamp
        '00:00:0' + time,
        '-frames:v', //! config number of frames
        '1', // ! 1 frame
        '-filter:v', //! config filter
        'scale=510:-1', //! scale the image to 510px width
        //! Output
        `${file_name}_${time}.jpg`
      );
    });

    await this.ffmpeg.run(
      ...commands //! spread the commands array
    ); //! run the ffmpeg command

    time_stamp_seconds.forEach((time) => {
      const screen_short_file = this.ffmpeg.FS(
        'readFile',
        `${file_name}_${time}.jpg`
      ); //! read the file from the file system
      const url = URL.createObjectURL(
        new Blob([screen_short_file.buffer], { type: 'image/jpg' })
      ); //! convert the file to url
      this.screenShort_urls.push(url);
    });
    this.isUploading = false;
    return this.screenShort_urls;
  };

  //! blob to url
  blobFromUrl = async (blob: string) => {
    const res = await fetch(blob);
    const data = await res.blob();
    return data;
  };
}
