import { createGlobalStyle } from 'styled-components'
export const Theme = createGlobalStyle`
:host {
    --squeak-button-color: 29, 74, 255;
    --squeak-primary-color: ${(props) =>
      props.dark ? '255, 255, 255' : '0, 0, 0'};
      --squeak-border-radius: .25rem;
      --squeak-base-font-size: 16px;
      --squeak-thread-border-style: dashed;
    all: initial;
    font-family: inherit;
    
  }

.squeak {
    font-size: var(--squeak-base-font-size);

    *:not(pre *) {
        box-sizing: border-box;
        font-family: var(--squeak-font-family);
    }
    
    button {
        background: transparent;
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
            border: solid 1.5px rgba(var(--squeak-primary-color), .2);
            color: rgba(var(--squeak-primary-color), .5);
        }
    }

    .squeak-form input {
        width: 100%;
        padding: 0;
        border: none;
        font-size: 1em;
        font-weight: 700;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid rgba(var(--squeak-primary-color), .3);
        background: transparent;
    }

    .squeak-form > div,
    .squeak-authentication-form {
        border: 1.5px solid rgba(var(--squeak-primary-color), .3);
        border-radius: var(--squeak-border-radius);
        overflow: hidden;
        position: relative;
    }

    .squeak-authentication-form-container h4 {
        margin: 0 0 0.75rem 0;
        font-size: .875em;
        opacity: 0.4;
    }

    .squeak-authentication-form-container label {
        font-size: .875em;
        font-weight: 600;
        opacity: 0.6;
    }

    .squeak-authentication-form-name {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 0.5rem;
    }

    .squeak-authentication-form {
        padding: 1.25rem;
        form {
            button {
                margin-top: 0.75rem;
            }
        }
    }

    .squeak-authentication-form button {
        width: 100%;
        transition: color 0.2s;
    }

    .squeak-authentication-form button.active {
        color: rgba(var(--squeak-button-color), 1);
    }

    .squeak-authentication-form input {
        border: 1px solid rgba(var(--squeak-primary-color), .3);
        font-size: .875em;
        padding: 0.75rem 1rem;
        border-radius: var(--squeak-border-radius);
        display: block;
        width: 100%;
        background: transparent;
    }

    .squeak-authentication-form label {
        display: block;
        margin-bottom: 0.5rem;
        margin-top: 0.75rem;
    }

    .squeak-authentication-navigation {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        padding-bottom: 0.75rem;
        position: relative;
        margin-bottom: 2rem;
    }

    .squeak-authentication-navigation button {
        font-size: .875em;
        border: none;
        background: none;
        font-weight: 600;
        cursor: pointer;
    }

    .squeak-authentication-navigation-rail {
        position: absolute;
        height: 3px;
        width: 50%;
        background: rgba(var(--squeak-button-color), 1);
        bottom: 0;
        transition: all 0.2s;
        left: 0;
        border-radius: var(--squeak-border-radius);
    }

    .squeak-authentication-navigation-rail.sign-up {
        transform: translateX(100%);
    }

    .squeak-avatar-container {
        flex-shrink: 0;
        line-height: 0;
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

    .squeak-replies .squeak-avatar-container {
    }

    .squeak-replies .squeak-avatar-container img,
    .squeak-replies .squeak-avatar-container svg {
        border-radius: 100px;
        height: 25px;
        width: 25px;
    }

    .squeak-post-preview-container h3 {
        margin: 0 0 0.5rem 0;
        font-size: .933em;
        font-weight: 600;
    }

    .squeak-post-preview-container {
        border: 1px solid rgba(var(--squeak-primary-color), .3);
        padding: 1.25rem;
        border-radius: var(--squeak-border-radius);
        margin-bottom: 2rem;
        box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
            0px 4.5288px 3.62304px rgba(0, 0, 0, 0.0243888);
    }

    .squeak-post-preview-container button {
        font-size: .875em;
        font-weight: bold;
        color: rgba(var(--squeak-button-color), 1);
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        margin-top: 1rem;
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
            border-bottom: 1px solid rgba(var(--squeak-primary-color), .3);
        }
    }

    // affects questions (and FORMERLY replies)
    .squeak-post {
        display: flex;
        flex-direction: column;
    }

    .squeak-post-author {
        align-items: center;
        display: flex;
        > span:last-of-type {
            display: flex;
        }

        strong {
            font-weight: 600;
            margin-left: calc(8px + 5px);
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

    .squeak-form-frame {
        flex: 1;
    }

    .squeak-post-timestamp {
        color: rgba(var(--squeak-primary-color), .6);
        font-size: .875em;
    }

    .squeak-author-badge {
        font-size: .75em;
        border-radius: var(--squeak-border-radius);
        padding: 0.25rem;
        border: 1px solid rgba(var(--squeak-primary-color), .3);
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
            padding: 0 5px 0 calc(25px + 8px);
            position: relative;

            .squeak-post {

            }

            .squeak-post-author {
                padding-bottom: .25rem;
                
                strong {
                    font-weight: 600;
                    margin-left: 8px;
                }
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

    // post content defaults

    .squeak-post-content {
        margin-left: 20px;
        border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
        padding-left: calc(25px + 8px);
    }

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
        display: flex;
        width: 100%;

        .squeak-avatar-container {
            margin-right: 8px;
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
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex: 1;
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
        font-weight: bold;
        opacity: 0.5;
        cursor: pointer;
        transition: opacity 0.2s;

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

    .squeak-form-frame {
        margin-bottom: 1rem;
    }

    .squeak-form-richtext-buttons-container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
    }

    // UI elements

    .squeak-form-richtext textarea {
        background: transparent;
        border: none;
        font-size: .875em;
        height: 150px;
        padding: 0.75rem 1rem;
        resize: none;
        width: 100%;
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
        background: none !important;
        color: rgba(var(--squeak-primary-color), .3) !important;
        margin-top: 0.5rem !important;
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

    .squeak-resolve-button, .squeak-undo-resolved {
        background: none;
        border: none;
        padding: 0;
        color: rgba(var(--squeak-button-color), 1);
        cursor: pointer;
    }
    .squeak-resolve-button {
        margin-top: 1rem;
    }
    .squeak-undo-resolved {
        margin-left: .5rem;
        font-weight: 600;
    }
    .squeak-resolve-button, .squeak-unresolve-button, .squeak-resolve-text {
        font-size: .875em;
        font-weight: 600;
        z-index: 1;
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

    .squeak-resolved-badge {
        font-size: .75em;
        border-radius: var(--squeak-border-radius);
        padding: 0.25rem;
        border: 1px solid rgba(0, 130, 0, .8);
        color: rgba(0, 130, 0, .8);
    }
}
`
