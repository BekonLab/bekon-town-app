import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';
import { ButtonDirective, HeaderComponent } from './shared';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatIconModule,
    LetDirective,
    HeaderComponent,
    ButtonDirective,
  ],
  selector: 'hd-home',
  template: `
    <div
      *ngrxLet="mobileQuery$; let mobileQuery"
      [ngClass]="{
        'min-h-[calc(100vh-56px)] mt-[56px]': mobileQuery.matches,
        'min-h-[calc(100vh-64px)] mt-[64px]': !mobileQuery.matches
      }"
      class="flex flex-col"
    >
      <header
        [ngClass]="{
          'h-[calc(100vh-56px)]': mobileQuery.matches,
          'h-[calc(100vh-64px)]': !mobileQuery.matches
        }"
        class="flex justify-center items-center flex-col gap-4 border-b-2 border-black"
      >
        <img src="assets/logo.png" class="w-56 h-56" />

        <h1 class="bp-gothic-bold-regular-font text-6xl">Bekon Town</h1>
        <p class="text-center">
          Empowering citizens to shape their community's future with
          <b>Bekon Town!</b> <br />
          Join us in building a better tomorrow, one proposal at a time.
        </p>
      </header>

      <section>
        <hd-header hdHeaderClass="px-4 py-[4.5rem]">
          <h2 class="text-6xl">The Problem</h2>
        </hd-header>

        <ul>
          <li
            class="px-4 py-2 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <p><b>Ever-decreasing</b> community participation.</p>
          </li>
          <li
            class="px-4 py-2 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <p><b>Opaque</b> government tender processes.</p>
          </li>
          <li
            class="px-4 py-2 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <p>The community has <b>no say</b> in how tax is spent.</p>
          </li>
          <li
            class="px-4 py-2 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <p>Missing opportunities to boost <b>local talent</b>.</p>
          </li>
        </ul>
      </section>

      <section>
        <hd-header hdHeaderClass="px-4 py-[4.5rem]">
          <h2 class="text-6xl">The Solution</h2>
        </hd-header>

        <ul class="flex items-stretch">
          <li
            class="px-4 py-16 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg text-center font-semibold">
              Community-sourced proposals
            </h3>
            <p class="text-center">
              Community members submit their own proposals to the platform and
              also vote for the best budget to accomplish them.
            </p>
          </li>
          <li
            class="px-4 py-16 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg text-center font-semibold">
              Corruption-resistant government tender
            </h3>
            <p class="text-center">
              Relaying on blockchain technology to create a transparent path of
              a proposal's life from submission to completion.
            </p>
          </li>
          <li
            class="px-4 py-16 border-2 border-black hover:bg-[#F8FAFC] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg text-center font-semibold">
              Crowd-funded projects
            </h3>
            <p class="text-center">
              Through donations, community members collectively raise the budget
              to accomplish a selected proposal.
            </p>
          </li>
        </ul>
      </section>

      <section class="p-4 border-b-2 border-black">
        <iframe
          class="mx-auto"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3f31oufqFSM?si=4S4UnAOQDKNRNntW"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </section>

      <section>
        <hd-header hdHeaderClass="px-4 py-[4.5rem]">
          <h2 class="text-6xl">Roadmap</h2>
        </hd-header>

        <article class="flex items-stretch h-48 group">
          <div
            class="flex-1 flex flex-col justify-center px-8 py-4 border-2 border-black group-hover:bg-[#F8FAFC] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg font-semibold">SPL Governance Integration</h3>
            <p>
              Adapt the Solana program to use SPL Governance via CPIs, adapting
              it in a wrapper program with our needed features.
            </p>
          </div>
          <div
            class="border-2 border-black flex-1 flex flex-col justify-center px-8 py-4"
          >
            <p class="flex gap-2 items-center text-2xl">
              <mat-icon inline class="scale-150">arrow_right</mat-icon>
              <span
                class="group-hover:underline transition duration-300 ease-in-out"
              >
                Q4 2023
              </span>
            </p>
          </div>
        </article>

        <article class="flex items-stretch h-48 group">
          <div
            class="border-2 border-black flex-1 flex flex-col justify-center px-8 py-4 items-end"
          >
            <p class="flex gap-2 items-center text-2xl">
              <span
                class="group-hover:underline transition duration-300 ease-in-out"
              >
                Q1 2024
              </span>
              <mat-icon inline class="scale-150">arrow_left</mat-icon>
            </p>
          </div>
          <div
            class="flex-1 flex flex-col justify-center px-8 py-4 border-2 border-black group-hover:bg-[#F8FAFC] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg font-semibold">Budgeting Tools for Providers</h3>
            <p>
              Add cliff, vesting and reputation system to the service providers
              payment.
            </p>
          </div>
        </article>

        <article class="flex items-stretch h-48 group">
          <div
            class="flex-1 flex flex-col justify-center px-8 py-4 border-2 border-black group-hover:bg-[#F8FAFC] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg font-semibold">Prepare educative materials</h3>
            <p>
              Create tutorials for the population to understand how to use it
              and organise talks to explain the application of blockchain use in
              real world governance.
            </p>
          </div>
          <div
            class="border-2 border-black flex-1 flex flex-col justify-center px-8 py-4"
          >
            <p class="flex gap-2 items-center text-2xl">
              <mat-icon inline class="scale-150">arrow_right</mat-icon>
              <span
                class="group-hover:underline transition duration-300 ease-in-out"
              >
                Q2 2024
              </span>
            </p>
          </div>
        </article>

        <article class="flex items-stretch h-48 group">
          <div
            class="border-2 border-black flex-1 flex flex-col justify-center px-8 py-4 items-end"
          >
            <p class="flex gap-2 items-center text-2xl">
              <span
                class="group-hover:underline transition duration-300 ease-in-out"
              >
                Q3 2024
              </span>
              <mat-icon inline class="scale-150">arrow_left</mat-icon>
            </p>
          </div>
          <div
            class="flex-1 flex flex-col justify-center px-8 py-4 border-2 border-black group-hover:bg-[#F8FAFC] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out"
          >
            <h3 class="text-lg font-semibold">Activation Program</h3>
            <p>
              Start discussions with governments to use the platform in the real
              world. Starting with small local communities.
            </p>
          </div>
        </article>
      </section>

      <footer class="flex">
        <div class="w-72 p-4 border-r-2 border-black">
          <img src="assets/logo.png" class="w-24 h-24 mx-auto" />

          <p class="bp-gothic-bold-regular-font text-xl text-center mb-2">
            Bekon Town
          </p>

          <div class="flex justify-center flex-col">
            <a
              hdButton
              hdButtonClass="inline-block text-center"
              href="./assets/terms-and-conditions.pdf"
              download="terms-and-conditions.pdf"
            >
              Terms & Conditions
            </a>
            <a
              hdButton
              hdButtonClass="inline-block text-center"
              href="./assets/privacy-policy.pdf"
              download="privacy-policy.pdf"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div class="flex-grow">
          <div class="border-b-2 border-black px-4 py-4">
            <p class="text-xl">Want to know more?</p>
          </div>

          <div class="p-8">
            <p class="mb-4">
              <b>Bekon Town</b> is revolutionizing community engagement with its
              transparent, intuitive and an open Source blockchain platform,
              currently participating in the Hyperdrive Solana Hackathon!
            </p>

            <div>
              <a
                hdButton
                hdButtonClass="inline-block mr-4"
                href="./assets/bekon-town-pitch-deck.pdf"
                download="bekon-town-pitch-deck.pdf"
              >
                Pitch Deck Presentation
              </a>
              <a
                hdButton
                href="https://solana.com/hyperdrive"
                target="_blank"
                hdButtonClass="inline-block"
              >
                Solana Hyperdrive Hackathon
              </a>
            </div>
          </div>
        </div>

        <div class="w-72 border-l-2 border-black grid grid-rows-3">
          <a
            hdButton
            hdButtonClass="flex-1 flex items-center justify-center gap-2"
            href="https://github.com/BekonLab"
            target="_blank"
          >
            <img src="assets/github-logo.png" class="w-8 h-8" />

            <span> GitHub </span>
          </a>
          <a
            hdButton
            hdButtonClass="flex-1 flex items-center justify-center gap-2"
            href="https://twitter.com/BekonTown"
            target="_blank"
          >
            <img src="assets/twitter-logo.png" class="w-6 h-6" />

            <span> Twitter / X </span>
          </a>
          <div class="flex-1 flex items-center justify-center">
            <p>Made with ❤️ from 🇪🇸</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  private readonly _breakpointObserver = inject(BreakpointObserver);

  readonly mobileQuery$ =
    this._breakpointObserver.observe('(max-width: 600px)');
}
