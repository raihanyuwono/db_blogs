"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("blogs", [
            {
                title: "The World Legacy - Part 1: Origins of the World Legacy",
                content: `The World Legacy story in the Yu-Gi-Oh! lore revolves around a powerful ancient civilization that existed in the distant past. This civilization harnessed extraordinary powers through the use of magical artifacts known as World Legacies. These Legacies were immensely powerful, capable of shaping reality itself. However, their usage also brought about the civilization's downfall, as they attracted the attention of dark forces seeking to exploit their power.`,
                keywords:
                    "Fiksi;WorldLegacy;Lore;Yu-Gi-Oh!;Crusadia;Knightmare;Mekk-Knight;Krawler;Orcust",
                url_img: "public/images/blog/WorldLegacyDiscovery.webp",
                url_video: "",
                id_user: "952bc1a2-1db3-4753-8b9d-335c5b5a490e",
                id_category: 6,
                id_country: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "The World Legacy - Part 2: The Battle of Mekk-Knights and Krawlers",
                content: `In a bid to safeguard the World Legacies, the Mekk-Knights, a group of powerful warriors, engaged in a fierce battle against the Krawlers, an underground-dwelling insectoid faction. The Mekk-Knights, led by Morningstar, employed their formidable abilities and summoned their mechanical allies to confront the Krawlers' relentless onslaught. The clash between these rival factions was intense, as they fought for control of the Legacies and the fate of the ancient civilization hung in the balance.`,
                keywords:
                    "Fiksi;WorldLegacy;Lore;Yu-Gi-Oh!;Crusadia;Knightmare;Mekk-Knight;Krawler;Orcust",
                url_img: "public/images/blog/mekk-knight.jpg",
                url_video: "",
                id_user: "952bc1a2-1db3-4753-8b9d-335c5b5a490e",
                id_category: 6,
                id_country: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "Golang",
                content: `Go, or Golang, is an open-source language developed by Google. It combines efficiency of low-level languages with readability of high-level ones. Go prioritizes scalability, concurrency, and simplicity. It has built-in support for concurrent programming, a garbage collector, and produces standalone binaries. Go's tooling and active community make it popular for efficient software development.`,
                keywords: "Programming;Go;Golang;Backend",
                url_img: "public/images/blog/golang.png",
                url_video: "",
                id_user: "aadc2c5c-1e29-4854-946b-1c50f5fdf407",
                id_category: 1,
                id_country: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "Express vs Golang",
                content: `Go (Golang) prioritizes efficiency, scalability, and concurrency, with built-in support for concurrent programming. Express, a flexible Node.js web framework, emphasizes simplicity and rapid development. Go excels in high-traffic applications due to its concurrency features, while Express offers greater flexibility. Choosing between them depends on the specific project requirements and priorities.`,
                keywords: "Programming;Go;Golang;Backend;Express;Comparasion",
                url_img: "public/images/blog/nodejs-vs-golang.jpg",
                url_video: "",
                id_user: "f3c75ee0-da14-4870-ae32-5979915aac4a",
                id_category: 1,
                id_country: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "Yu-Gi-Oh! : Competitive Card Game",
                content: `Yu-Gi-Oh! is an intricate trading card game that has gained recognition as a competitive sport. Combining strategic thinking, quick decision-making, and card synergy, it challenges players' mental acuity. Tournaments are held worldwide, with professional players showcasing their skills. The game's complexity and competitive nature have led to its classification as a mind sport, attracting a dedicated community of players and spectators alike.`,
                keywords: "Yu-Gi-Oh!;Sport",
                url_img: "public/images/blog/yugioh_a.jpeg",
                url_video: "",
                id_user: "68488815-5d3a-4695-b060-494f37a20d82",
                id_category: 2,
                id_country: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("blogs", null, {});
    },
};
