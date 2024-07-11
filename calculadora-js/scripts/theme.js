const themes = {
    actualTheme: 'light',
    light: {
        alias: 'light',
        label: 'claro',
        opposite: 'escuro'
    },
    dark: {
        alias: 'dark',
        label: 'escuro',
        opposite: 'claro'
    }
}

const switchColorButton = document.querySelector('.switch-color__button')

const toggleTheme = () => {
    const linkthemeAlreadyExist = document.getElementById('theme')
    const head = document.querySelector('head')
    const linkStyleCSS = linkthemeAlreadyExist ? linkthemeAlreadyExist : document.createElement('link')
    linkStyleCSS.id = 'theme'
    linkStyleCSS.rel = 'stylesheet'
    linkStyleCSS.href = `./styles/theme/${themes[themes.actualTheme].alias}.style.css`
    head.appendChild(linkStyleCSS)
    const switchColorAppointment = document.querySelector('.switch-color__appointment')
    switchColorAppointment.textContent = switchColorAppointment.textContent.replace(themes[themes.actualTheme].label, themes[themes.actualTheme].opposite)

    themes.actualTheme = themes.actualTheme === 'light' ? 'dark' : 'light'
    switchColorButton.style.marginLeft = themes.actualTheme === 'light' ? 'calc(100% - 1rem)' : '0'
}
toggleTheme()

const switchColorToggle = document.querySelector('.switch-color__toggle')
switchColorToggle.addEventListener('click', toggleTheme)