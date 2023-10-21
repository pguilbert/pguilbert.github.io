import { effect, signal } from "@preact/signals-core"

type Mode = 'dark' | 'light'

const setupLightSwitch = (button: HTMLButtonElement) => {
    const isBrowserPreferDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    const mode = signal<Mode>(localStorage.getItem('mode') as Mode ?? (isBrowserPreferDarkMode ? 'dark' : 'light'))
    effect(() => {
        document.body.classList.remove('dark-mode', 'light-mode')
        document.body.classList.add(`${mode.value}-mode`)
    })

    button.addEventListener('click', () => {
        mode.value = mode.value === 'light' ? 'dark' : 'light'
        localStorage.setItem('mode', mode.value)
    })

    window.addEventListener('storage', () => {
        mode.value = localStorage.getItem('mode') as Mode
    })
}

setupLightSwitch(document.querySelector<HTMLButtonElement>('#light-switch')!)
