import { createGlobalStyle } from 'styled-components'
export const Theme = createGlobalStyle`
:host {
    --squeak-button-color: 29, 74, 255; // rgb triplets, no hex
    --squeak-primary-color: ${(props) =>
      props.dark ? '255, 255, 255' : '0, 0, 0'}; // rgb triplets, no hex
      --squeak-border-radius: .25rem; // adjusts all radii
      --squeak-base-font-size: 16px;
      --squeak-thread-border-style: dashed; // css border style
      --squeak-input-background-color: #fff; // hex
    all: initial;
    font-family: inherit;
  }

.squeak {
    font-family: -apple-system, BlinkMacSystemFont; // for dev use
    font-size: var(--squeak-base-font-size);

    *:not(pre *) {
        box-sizing: border-box;
        font-family: var(--squeak-font-family);
    }
    
    button {
        background: var(--squeak-input-background-color);
        border: solid 1.5px rgba(var(--squeak-button-color), .85);
        border-radius: var(--squeak-border-radius);
        color: rgba(var(--squeak-button-color), .85);
        cursor: pointer;
        font-size: .933em;
        font-weight: 500;
        padding: 0.6rem 1rem;

        &:hover {
            border: solid 1.5px rgba(var(--squeak-button-color), .9);
            color: rgba(var(--squeak-button-color), .9);
        }

        &:active {
            border: solid 1.5px rgba(var(--squeak-button-color), 1);
            color: rgba(var(--squeak-button-color), 1);
        }

        &[disabled] {
            background: transparent;
            border: solid 1.5px rgba(var(--squeak-primary-color), .2);
            color: rgba(var(--squeak-primary-color), .5);
            cursor: not-allowed;
        }
    }

    input {
        background: var(--squeak-input-background-color);
    }

    .squeak-form {
        input {
            background: var(--squeak-input-background-color);
            border-top: none;
            border-right: none;
            border-bottom: 1px solid rgba(var(--squeak-primary-color), .3);
            border-left: none;
            font-size: 1em;
            font-weight: 700;
            padding: 0.75rem 1rem;
            width: 100%;
        }
    }

    .squeak-authentication-form-container {
        margin-left: 50px;

        .squeak-authentication-form {
            border: 1px solid rgba(var(--squeak-primary-color), .3);
            border-radius: var(--squeak-border-radius);
            overflow: hidden;
            position: relative;

            button {
                transition: color 0.2s;
                width: 100%;

                &.active {
                    color: rgba(var(--squeak-button-color), 1);
                }
            }

            input {
                border-radius: var(--squeak-border-radius);
                border: 1px solid rgba(var(--squeak-primary-color), .3);
                display: block;
                font-size: .875em;
                margin-bottom: 1.25rem;
                padding: 0.75rem 1rem;
                width: 100%;
            }

            label {
                display: block;
                font-size: .875em;
                font-weight: 600;
                margin-bottom: 0.5rem;
                opacity: 0.6;
            }

            .squeak-authentication-form-wrapper {
                padding: 1.5rem 1.5rem .5rem;
            }
        }

        h4 {
            margin: 0 0 0.75rem;
            font-size: 1em;
            text-align: center;
        }
    }

    .squeak-authentication-form-name {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 0.5rem;
    }

    .squeak-authentication-navigation {
        background: rgba(var(--squeak-primary-color),.03);
        border-bottom: 1px solid rgba(var(--squeak-primary-color),.1);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        position: relative;

        button {
            font-size: .875em;
            border: none;
            border-bottom: solid 1px transparent;
            border-radius: 0;
            background: none;
            padding: .75rem .25rem calc(.75rem + 1px);

            &:not(.active) {
                color: rgba(var(--squeak-primary-color),.5);

                &:hover {
                    color: rgba(var(--squeak-primary-color),.6);
                    border-bottom: .5px solid rgba(var(--squeak-primary-color),.25);
                }
            }
        }
    }

    .squeak-authentication-navigation-rail {
        background: rgba(var(--squeak-button-color), 1);
        border-radius: var(--squeak-border-radius);
        bottom: -1px;
        height: 2px;
        left: 0;
        position: absolute;
        transition: all 0.2s;
        width: 50%;
    }

    .squeak-authentication-navigation-rail.sign-up {
        transform: translateX(100%);
    }

    .squeak-avatar-container {
        float: left;
        flex-shrink: 0;
        line-height: 0;
        margin-right: 10px;
    }

    .squeak-avatar-container svg path:first-child {
        fill: rgba(var(--squeak-primary-color), .3);
    }

    .squeak-avatar-container img,
    .squeak-avatar-container svg {
        border-radius: 100px;
        height: 40px;
        width: 40px;
    }

    .squeak-replies .squeak-avatar-container img,
    .squeak-replies .squeak-avatar-container svg {
        border-radius: 100px;
        height: 25px;
        width: 25px;
    }

    .squeak-post-preview-container {
        align-items: center;
        border: 1px solid rgba(var(--squeak-primary-color), .3);
        display: flex;
        padding: .7rem 1rem;
        border-radius: var(--squeak-border-radius);
        margin-bottom: 1rem;

        .squeak-post-preview {
            align-items: baseline;
            display: flex;
            flex: 1;
            min-width: 0;
        }

        h3, p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        h3 {
            flex: 0 auto;
            font-size: 1em;
            font-weight: 700;
            margin: 0 .5em 0 0;
        }

        .squeak-post-markdown {
            flex: 1;
            font-size: .875em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            p {
                margin: 0;
            }
        }

        .squeak-button-container {
            margin-left: .25em;
            white-space: nowrap;
        }

        button {
            border: 1px solid transparent;
            color: rgba(var(--squeak-button-color), 1);
            padding: 0;
        }
    }

    .squeak-replies,
    .squeak-questions {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .squeak-questions {
        margin-bottom: 1.5rem;

        > li {
            padding: 1.25rem 0;
        }
        
        .squeak-reply-buttons-row {
            margin-left: 35px;
        }
    }

    // affects questions
    .squeak-post {
        display: flex;
        flex-direction: column;

        // top-level questions
        .squeak-post-content {
            margin-left: 20px;
            border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
            padding-left: calc(25px + 5px);
        }

        // replies to questions
        .squeak-replies {
            .squeak-post-content {
                padding-left: calc(25px + 10px);
            }
        }
    }

    .squeak-question-container {
        .squeak-authentication-form-container {
            margin-left: 35px;
        }
    }

    .squeak-post-author {
        align-items: center;
        display: flex;

        .squeak-avatar-container {
            margin-right: 10px;
        }
        
        > span:last-of-type {
            display: flex;
        }

        strong {
            font-weight: 600;
        }

        // add left margin to all elements that aren't the avatar
        span {
            margin-left: .5rem;
        }
    }

    button.squeak-reply-skeleton {
        border: solid 1.5px rgba(var(--squeak-primary-color), .3);
        padding: 15px;
        flex: 1;
        text-align: left;

        span {
            color: rgba(var(--squeak-primary-color), .6);

            strong {
                color: rgba(var(--squeak-primary-color), .65);
                font-weight: bold;
                text-decoration: underline;
            }
        }

        &:hover {
            border: solid 1.5px rgba(var(--squeak-primary-color), .5);
            
            span {
                color: rgba(var(--squeak-primary-color), .7);

                strong {
                    color: rgba(var(--squeak-primary-color), .75);
                }
            }
        }
    }

    button:hover .squeak-reply-skeleton strong {
        color: rgba(var(--squeak-primary-color), .9);
    }

    .squeak-post-timestamp {
        color: rgba(var(--squeak-primary-color), .6);
        font-size: .875em;
    }

    .squeak-author-badge {
        border: 1px solid rgba(var(--squeak-primary-color), .3);
        border-radius: calc(var(--squeak-border-radius) * .75);
        font-size: .75em;
        padding: .2rem .3rem;
    }

    .squeak-post h3 {
        font-size: 1em;
        font-weight: 600;
        margin: 0;
        padding-bottom: .25rem;
    }

    // replies styling only

    .squeak-replies {
        margin-left: 20px;

        li {
            padding: 0 5px 0 calc(25px + 5px);
            position: relative;

            .squeak-avatar-container {
                margin-right: 8px;
            }

            .squeak-post {

            }

            .squeak-post-author {
                padding-bottom: .25rem;
            }

            .squeak-post-content {
                border-left: 0;
                margin-left: calc(25px + 8px); // avatar + avatar right margin
                padding-left: 0;
                padding-bottom: .25rem;
            }
        }

        // left border on replies
        &:not(.squeak-thread-resolved) li {
            border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);

            // don't show left border inside, since parent has border
            &:before {
                border-left: none;
            }
        }
    }

    // left border and curved line on replies
    .squeak-reply-form-container:before,
    .squeak-replies li:before {
        border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
        border-bottom: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
        border-bottom-left-radius: 6px;
        content: '';
        height: 13px;
        left: 0;
        position: absolute;
        top: 0;
        width: 30px;
    }

    .squeak-replies.squeak-thread-resolved li:not(:last-child) {
        border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
    }

    // don't show left border inside, since parent has border
    .squeak-replies:not(.squeak-thread-resolved) li:before {
        border-left: none;
    }

    .squeak-replies.squeak-thread-resolved li:not(:last-child):before {
        border-left: none;
    }

    ul.squeak-thread-resolved {
        li:not(.squeak-solution) {
            opacity: .5;
        }
    }

    // post content defaults

    .squeak-post-markdown {
        font-size: .933em;
        line-height: 1.4;

        p {
            margin-top: 0;
        }

        a {
            color: rgba(var(--squeak-button-color), 1);
            text-decoration: none;
        }

        pre {
            border-radius: var(--squeak-border-radius);
            font-size: .875em;
            margin: 0.75rem 0;
            max-height: 450px;
            overflow: scroll;
            padding: 1rem;
        }
    }

    .squeak-reply-form-container {
        margin-left: 20px;
        padding-right: 20px;
        padding-left: calc(25px + 8px);
        position: relative;
        width: 100%;

        .squeak-avatar-container {
            float: left; // has to float, not use flexbox, so we can truncate the preview text before authenticating
            margin-right: 10px;
            width: 25px;
        }

        .squeak-avatar-container { 
            svg, img {
                height: 25px;
                width: 25px;
            }
        }

        > div:nth-of-type(2) {
            flex-grow: 1;
        }
    }

    .squeak-reply-buttons {
        display: flex;
        flex: 1;
    }

    .squeak-reply-buttons-row {
        display: flex;
        justify-content: space-between;
        margin-left: 50px;
    }

    .squeak-post-button {
        margin-top: 0 !important;
    }

    .squeak-by-line {
        align-items: center;
        color: rgba(var(--squeak-primary-color), .3) !important;
        display: flex;
        font-size: .813rem;

        a {
            display: flex;
            margin-left: .2rem;
        }
    }

    .squeak-logout-button {
        border: solid 1.5px transparent;
        background: none;
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }

    .squeak-markdown-logo {
        line-height: 0;
        margin: 0 .5rem 0 0;

        a {
            color: rgba(var(--squeak-primary-color), .3);

            &:hover {
                color: rgba(var(--squeak-primary-color), .4);
            }
        }
    }

    // applies to top-level question form only
    .squeak > .squeak-form-frame > .squeak-form {
        > .squeak-avatar-container {
            width: 40px;
        }
    }

    .squeak-form-frame {
        flex: 1;
        margin-bottom: 1rem;
    }

    .squeak-inputs-wrapper {
        background: var(--squeak-input-background-color);
        border: 1px solid rgba(var(--squeak-primary-color), .3);
        border-radius: var(--squeak-border-radius);
        overflow: hidden;
        margin-bottom: 1rem;
        // don't apply width: 100%
    }

    .squeak-form-richtext-buttons-container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
    }

    // UI elements

    .squeak-form-richtext {
        // only applies to replies, not questions

        textarea {
            background: transparent;
            border: none;
            font-size: .875em;
            height: 150px;
            padding: 0.75rem 1rem;
            resize: none;
            width: 100%;
        }
    }

    .squeak-form-richtext-buttons {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0 0 0 0.5rem;
        
        button {
            align-items: center;
            background: none;
            border: none;
            border-radius: var(--squeak-border-radius);
            color: rgba(var(--squeak-primary-color), .4);
            cursor: pointer;
            display: flex;
            height: 32px;
            justify-content: center;
            margin: 0;
            opacity: 1;
            padding: 0;
            width: 32px;

            &:hover {
                background: rgba(var(--squeak-primary-color), .1);
                color: rgba(var(--squeak-primary-color), .75);
            }

            &:active {
                background: rgba(var(--squeak-primary-color), .2);
                color: rgba(var(--squeak-primary-color), 1);
            }
        }
    }

    .squeak-forgot-password {
        background: transparent;
        color: rgba(var(--squeak-primary-color), .3) !important;
        border-color: transparent;
        margin-top: 0.5rem;

        &:hover,
        &:active {
            border-color: transparent;
        }
    }

    .squeak-return-to-post {
        background: none;
        border: none;
        color: rgba(var(--squeak-button-color), 1);
        cursor: pointer;
        font-size: inherit;
        font-weight: 600;
        padding: 0;
        width: auto !important;
    }

    .squeak-resolve-button {
        margin-bottom: 1rem;
        position: relative;
        top: -.5em;
    }

    .squeak-resolve-button,
    .squeak-undo-resolved {
        background: none;
        border: none;
        padding: 0;
        color: rgba(var(--squeak-button-color), 1);
        cursor: pointer;

        &:hover,
        &:active {
            border: none;
        }
    }
    .squeak-undo-resolved {
        font-size: .875em;
        font-weight: 600;
        margin-left: .5rem;
    }
    .squeak-resolve-button, .squeak-unresolve-button, .squeak-resolve-text {
        font-size: .875em;
        font-weight: 600;
        z-index: 1;
    }

    .squeak-resolved-badge {
        border-radius: calc(var(--squeak-border-radius) * .75);
        border: 1.5px solid rgba(0, 130, 0, .8);
        color: rgba(0, 130, 0, .8);
        font-size: .688em;
        font-weight: 600;
        padding: .2rem .3rem;
        text-transform: uppercase;
    }

    .squeak-locked-message {
        background: rgba(var(--squeak-primary-color), .03);
        border: 1px solid rgba(var(--squeak-primary-color), .1);
        border-radius: var(--squeak-border-radius);
        margin-bottom: 0;
        text-align: center;

        p {
            color: rgba(var(--squeak-primary-color), .6);
            font-size: .875em;
        }
    }
}
`
