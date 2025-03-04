import { Component, HTMLProps, RefCallback } from "react";

interface HTMLPropsWithRefCallback<T> extends HTMLProps<T> {
    ref: RefCallback<T>;
}

export interface ReactSliderProps<T extends number | readonly number[] = number> {
    // Disallow children
    children?: never | undefined;

    /**
     * `aria-label` for screen-readers to apply to the thumb(s).
     *
     * Use an array for more than one thumb.
     * The length of the array must match the number of thumbs in the `value` array.
     */
    ariaLabel?: T extends number ? string : readonly string[] | undefined;

    /**
     * aria-labelledby for screen-readers to apply to the thumbs.
     * Used when slider rendered with separate label.
     * Use an array for more than one thumb.
     * The length of the array must match the number of thumbs in the value array.
     */
    ariaLabelledby?: T extends number ? string : readonly string[] | undefined;

    /**
     * `aria-valuetext` for screen-readers.
     *
     * Can be a static string, or a function that returns a string:
     *
     * ```
     * state => `Value: ${state.value}`
     * ```
     *
     * - `state.index` - the index of the thumb
     * - `state.value` - the current value state
     * - `state.valueNow` - the value of the thumb (i.e. aria-valuenow)
     */
    ariaValuetext?: string | ((value: { index: number; value: T; valueNow: number }) => string) | undefined;

    /**
     * The css class set on the slider node.
     *
     * @default "slider"
     */
    className?: string | undefined;

    /**
     * Determines the initial position(s) of the thumb(s) and the number of thumbs.
     *
     * If a number is passed a slider with one thumb will be rendered.
     * If an array is passed each value will determine the position of one thumb.
     * The values in the array must be sorted.
     *
     * Don't pass a default value if the slider is controlled (i.e. if you already
     * use the `value` prop).
     *
     * @default 0
     */
    defaultValue?: (this["value"] extends T ? never : T) | undefined;

    /**
     * If `true` the thumbs can't be moved.
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * Inverts the slider.
     *
     * @default false
     */
    invert?: boolean | undefined;

    /**
     * The CSS class set on the marks.
     *
     * @default "mark"
     */
    markClassName?: string | undefined;

    /**
     * Shows passed marks on the track, if `true` it shows all the marks;
     * if an array of numbers it shows just the passed marks; if a number
     * is passed it shows just the marks in that steps: like passing `3`
     * shows the marks `3`, `6`, `9`.
     *
     * @default []
     */
    marks?: boolean | number | readonly number[] | undefined;

    /**
     * The maximum value of the slider.
     *
     * @default 100
     */
    max?: number | undefined;

    /**
     * The minimum value of the slider.
     *
     * @default 0
     */
    min?: number | undefined;

    /**
     * The minimal distance between any pair of thumbs.
     * Must be positive, but `0` means they can sit on top of each other.
     *
     * @default 0
     */
    minDistance?: number | undefined;

    /**
     * Callback called only after moving a thumb has ended. The callback
     * will only be called if the action resulted in a change.
     *
     * - `value` - the result value, or values if the slider has multiple thumbs and the thumb index
     */
    onAfterChange?: ((value: T, index: number) => void) | undefined;

    /**
     * Callback called before starting to move a thumb. The callback will
     * only be called if the action will result in a change.
     *
     * - `value` - the initial value, or values if the slider has multiple thumbs and the thumb index
     */
    onBeforeChange?: ((value: T, index: number) => void) | undefined;

    /**
     * Callback called on every value change.
     *
     * - `value` - the new value, or values if the slider has multiple thumbs and the thumb index
     */
    onChange?: ((value: T, index: number) => void) | undefined;

    /**
     * Callback called when the the slider is clicked (thumb or tracks).
     *
     * - `value` - the value at the clicked position
     */
    onSliderClick?: ((value: number) => void) | undefined;

    /**
     * Determines whether the slider moves horizontally (from left to right)
     * or vertically (from top to bottom).
     *
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical" | undefined;

    /**
     * The result of the function is the value to be added or subtracted
     * when the `Page Up` or `Page Down` keys are pressed.
     *
     * - `step` - the current step value
     *
     * @default step => step * 10
     */
    pageFn?: ((step: number) => number) | undefined;

    /**
     * If `true` the active thumb will push other thumbs within the constraints
     * of `min`, `max`, `step` and `minDistance`.
     *
     * @default false
     */
    pearling?: boolean | undefined;

    /**
     * Provide a custom render function for the mark node.
     *
     * The render function will be passed one argument, an object with props that
     * should be added to your mark node.
     *
     * - `props` - props to be spread into your mark node
     *
     * @default props => <div {...props} />
     */
    renderMark?: ((props: HTMLPropsWithRefCallback<HTMLSpanElement>) => JSX.Element | null) | undefined;

    /**
     * Provide a custom render function for dynamic thumb content.
     *
     * The render function will be passed two arguments, an object with props that
     * should be added to your thumb node, and an object with thumb and slider state.
     *
     * - `props` - props to be spread into your thumb node
     * - `state.index` - the index of the thumb
     * - `state.value` - the current value state
     * - `state.valueNow` - the value of the thumb (i.e. `aria-valuenow`)
     *
     * @default props => <div {...props} />
     */
    renderThumb?:
        | ((
            props: HTMLPropsWithRefCallback<HTMLDivElement>,
            state: { index: number; value: T; valueNow: number },
        ) => JSX.Element | null)
        | undefined;

    /**
     * Provide a custom render function for the track node.
     *
     * The render function will be passed two arguments, an object with props that
     * should be added to your handle node, and an object with track and slider state.
     *
     * - `props` - props to be spread into your track node
     * - `state.index` - the index of the track
     * - `state.value` - the current value state
     *
     * @default props => <div {...props} />
     */
    renderTrack?:
        | ((
            props: HTMLPropsWithRefCallback<HTMLDivElement>,
            state: { index: number; value: T },
        ) => JSX.Element | null)
        | undefined;

    /**
     * Disables thumb move when clicking the slider track
     *
     * @default false
     */
    snapDragDisabled?: boolean | undefined;

    /**
     * Value to be added or subtracted on each step the slider makes.
     *
     * Must be greater than zero. `max - min` should be evenly divisible by the step value.
     *
     * @default 1
     */
    step?: number | undefined;

    /**
     * The css class set on the thumb that is currently being moved.
     * @default "active"
     */
    thumbActiveClassName?: string | undefined;

    /**
     * The css class set on each thumb node.
     *
     * In addition each thumb will receive a numbered css class of the form
     * `${thumbClassName}-${i}`, e.g. `thumb-0`, `thumb-1`, ...
     * @default "thumb"
     */
    thumbClassName?: string | undefined;

    /**
     * The css class set on the tracks between the thumbs.
     *
     * In addition track fragment will receive a numbered css class of the form
     * `${trackClassName}-${i}`, e.g. `track-0`, `track-1`, ...
     * @default "track"
     */
    trackClassName?: string | undefined;

    /**
     * Like `defaultValue` but for
     * [controlled components](http://facebook.github.io/react/docs/forms.html#controlled-components).
     */
    value?: T | undefined;

    /**
     * If `true` tracks between the thumbs will be rendered.
     * @default true
     */
    withTracks?: boolean | undefined;
}

declare class ReactSlider<T extends number | readonly number[] = number> extends Component<ReactSliderProps<T>> {
    /**
     * Tell the slider to resize, for example if the parent container has resized
     * independently of the window.
     */
    resize: () => void;
}

export default ReactSlider;
