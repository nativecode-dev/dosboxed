export interface DosboxConf {
  [key: string]: any

  cpu?: {
    core: 'auto' | 'dynamic' | 'normal' | 'simple'
    cputype: 'auto' | '386' | '386_slow' | '486_slow' | 'pentium_slow' | '386_prefetch'
    cycles: number | string
    cycleup: number
    cycledown: number
  }

  dos?: {
    xms: boolean
    ems: boolean
    umb: boolean
    keyboardlayout: string
  }

  dosbox?: {
    language: string
    machine:
      | 'hercules'
      | 'cga'
      | 'tandy'
      | 'pcjr'
      | 'ega'
      | 'vgaonly'
      | 'svga_s3'
      | 'svga_et3000'
      | 'svga_et4000'
      | 'svga_paradise'
      | 'vesa_nolfb'
      | 'vesa_oldvbe'
    captures: string
    memsize: number
  }

  gus?: {
    gus: boolean
    gusrate: 44100 | 48000 | 32000 | 22050 | 16000 | 11025 | 8000 | 49716
    gusbase: 240 | 220 | 260 | 280 | '2a0' | '2c0' | '2e0' | 300
    gusirc: 5 | 3 | 7 | 9 | 10 | 11 | 12
    gusdma: 3 | 0 | 1 | 5 | 6 | 7
    ultradir: string
  }

  joystick?: {
    joysticktype: 'auto' | 'none' | '2axis' | '4axis' | '4axis_2' | 'fcs' | 'ch'
    timed: boolean
    autofire: boolean
    swap34: boolean
    buttonwrap: boolean
  }

  midi?: {
    mpu401: 'intelligent' | 'uart' | 'none'
    mididevice: 'default' | 'win32' | 'alsa' | 'oss' | 'coreaudio' | 'coremidi' | 'none'
    midiconfig: string
  }

  mixer?: {
    nosound: boolean
    rate: number
    blocksize: number
    prebuffer: number
  }

  render?: {
    aspect: boolean
    frameskip: number
    scaler: string
  }

  sblaster?: {
    sbtype: 'sb1' | 'sb2' | 'sbpro1' | 'sbpro2' | 'sb16' | 'gb' | 'none'
    sbbase: 220 | 240 | 260 | 280 | '2a0' | '2c0' | '2e0' | 300
    irq: 7 | 5 | 3 | 9 | 10 | 11 | 12
    dma: 1 | 5 | 0 | 3 | 6 | 7
    hdma: 1 | 5 | 0 | 3 | 6 | 7
    sbmixer: boolean
    oplmode: 'auto' | 'cms' | 'opl2' | 'dualopl2' | 'opl3' | 'none'
    oplemu: 'default' | 'compat' | 'fast'
    oplrate: 44100 | 49716 | 48000 | 32000 | 22050 | 16000 | 11025 | 8000
  }

  sdl?: {
    fullscreen: boolean
    fulldouble: boolean
    fullresolution: string
    windowresolution: string
    output: 'surface' | 'overlay' | 'opengl' | 'openglnb' | 'ddraw'
    autolock: boolean
    sensitivity: number
    waitonerror: boolean
    priority: string
    mapperfile: string
    usescancodes: boolean
  }

  serial?: {
    serial1: 'dummy' | 'disabled' | 'modem' | 'nullmodem' | 'directserial'
    serial2: 'dummy' | 'disabled' | 'modem' | 'nullmodem' | 'directserial'
    serial3: 'dummy' | 'disabled' | 'modem' | 'nullmodem' | 'directserial'
    serial4: 'dummy' | 'disabled' | 'modem' | 'nullmodem' | 'directserial'
  }

  speaker?: {
    pcspeaker: boolean
    pcrate: 44100 | 48000 | 32000 | 22050 | 16000 | 11025 | 8000 | 49716
    tandy: 'auto' | 'on' | 'off'
    tandyrate: 44100 | 48000 | 32000 | 22050 | 16000 | 11025 | 8000 | 49716
    disney: boolean
  }
}
