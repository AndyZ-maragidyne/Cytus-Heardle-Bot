# Cytus Hearlde Discord Bot

This is a discord bot that has two major functionalities:

## 1. It gets a random song from the rhythm game "Cytus" and makes the user try and guess it. 
---
 It is discord bot version of the daily song guessing game heardle, where the user starts with a one second clip of the song and can listen to more of the song with each incorrect guess.
 expands upon the heradle game with many new features:

 - support for different gamemodes:
   - **scrambled:** song starts at a random time instead of at the beginning
   - **hard mode:** song lengths are halved
   - **fragmented:** song jumps to a different part every second
   - **reverse:** song is reversed
   - **chromatic:** each video is a different song and you have to guess all 6
   - **duo:** switches between 2 different songs
   - **quad:** switches between 4 different songs
   - **Gamemodes are randomly chosen when the song is generated and can stack, meaning there can be multiple activated at the same time**
- power up system:
   - When the user completes a level, they get coins that can be used to make future levels easier by obtaining information about the song
   such as what character it's from, or what the difficulty is.

- profile system to keep track of the player's coins, winstreak and information for dungeon crawler game
- command to play any song in the bot's library
   - The bot can join your active voice channel and play the song live, or send a video of it to a text channel
 
## 2. A Roguelike dungeon crawler game
---

 the player assembles a team of characters and a deck of cards to explore a dungeon and collect loot to upgrade their deck and their characters.
 features:
   - turn based battling system with support for ailments and on death abilites. Characters have a speed stat that determines how frequently they can attack
   - a shop and dungeon that automatically refresh every week
   - in depth upgrade system where players choose specific stats to upgrade for the characters (damage, health, ability) and branching paths for card upgrades
      - A card that inflicts weakness on and enemy could inflict 50% for 1 turn, 25% for 5 turns, or 5% for 10 turns depending on which stats were upgraded
   - support for saving player, dungeon and shop data to JSON format
