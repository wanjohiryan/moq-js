import * as Audio from "../audio"
import * as Video from "../video"
import * as Timeline from "../timeline"
import * as Stream from "../../stream"

// Any top level messages that can be sent to the worker.
export interface ToWorker {
	// Sent to configure on startup.
	config?: Config

	// Sent on each init/data stream
	// TODO combine into a single message
	init?: Stream.Buffer
	segment?: Stream.Buffer

	// Sent to control playback
	play?: Play
	seek?: Seek
}

// Any top-level messages that can be sent from the worker.
export interface FromWorker {
	// Sent back to the main thread on state change
	info?: Info
}

export interface ToWorklet {
	config?: Audio.Config
}

export type FromWorklet = any

export interface Config {
	audio: Audio.Config
	video: Video.Config
}

export interface Segment {
	buffer: Uint8Array // unread buffered data
	reader: ReadableStream // unread unbuffered data
}

export interface Play {
	// Start playback once the minimum buffer size has been reached.
	minBuffer: number
}

export interface Seek {
	timestamp: number
}

export interface Info {
	epoch: number // increases by 1 each update

	timestamp?: number
	audio: Timeline.Range[]
	video: Timeline.Range[]
}