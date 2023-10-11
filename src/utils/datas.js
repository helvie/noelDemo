const usersArray =
    [
        {
            pseudo: "Armel",
            password: "motdepasse1",
            email: "utilisateur1@example.com",
            token: "token123",
            isAdult: true,
            intro: "Bienvenue sur notre plateforme !",
            gifts: [
                {
                    title: "Une plante verte",
                    detail: "Ca sert à rien mais c'est joli, m'enfin, si, ça sert mais ça ne se voit pas",
                    url: "https://www.willemsefrance.fr/products/cafeier",
                    offered: false,
                    date: "2021-10-22"
                },
                {
                    title: "Un poulpe",
                    detail: "Parce que ça fait trop longtemps que je n'en ai pas eu",
                    url: "https://www.mer-ocean.com/le-saviez-vous-focus-sur-les-pieuvres/",
                    offered: false,
                    date: "2021-10-22"

                }
            ]
        },
        {
            pseudo: "Sylvie",
            password: "motdepasse2",
            email: "utilisateur2@example.com",
            token: "token456",
            isAdult: false,
            intro: "Bonjour à tous !",
            gifts: [
                {
                    title: "Une surprise",
                    detail: "Parce que trouver des cadeaux au pied levé, trop dur",
                    url: "https://www.temu.com/kuiper/dn9.html?subj=downloadable-ads-shopping&_bg_fs=1&_p_jump_id=841&_x_vst_scene=adg&goods_id=601099518045414&sku_id=17592222492642&adg_ctx=a-d8b3d99e~c-4169a77e~f-98020770&_x_ads_sub_channel=shopping&_p_rfs=1&_x_ns_prz_type=3&_x_ns_sku_id=17592222492642&mrk_rec=1&_x_ads_channel=google&_x_gmc_account=742384653&_x_login_type=Google&_x_ads_account=5198328713&_x_ads_set=20119649211&_x_ads_id=149548612552&_x_ads_creative_id=658327580848&_x_ns_source=g&_x_ns_gclid=CjwKCAjwg4SpBhAKEiwAdyLwvB9wFVOOr0NOy9ixtv3yFkR_PjfsYekA-tH8JuDkUJJxuTJy_kNhWhoCNKMQAvD_BwE&_x_ns_placement=&_x_ns_match_type=&_x_ns_ad_position=&_x_ns_product_id=17592222492642&_x_ns_target=&_x_ns_devicemodel=&_x_ns_wbraid=CjkKCQjw4P6oBhD6ARIoAHW15XBdRxAi2VEZRzBB6AznMjOZJv1cZq1Na21Y-gO_sKrV1aXk5hoCYno&_x_ns_gbraid=0AAAAAo4mICF0axK9-Tq5PfGRe7Glx9lPP&_x_ns_targetid=pla-2087099732323&gclid=CjwKCAjwg4SpBhAKEiwAdyLwvB9wFVOOr0NOy9ixtv3yFkR_PjfsYekA-tH8JuDkUJJxuTJy_kNhWhoCNKMQAvD_BwE",
                    offered: false,
                    date: "2021-10-22"

                },
                {
                    title: "Un cable qui relie mon ordi portable à mon gros écran",
                    detail: "C'est pratique",
                    url: "",
                    offered: false,
                    date: "2021-10-22"
                }
            ]
        },
        {
            pseudo: "Enora",
            password: "motdepasse3",
            email: "utilisateur3@example.com",
            token: "token789",
            isAdult: true,
            intro: "Vive les vacances ! Pis c'est super Noël parce que des fois il y a de la neige et des cadeaux. Et puis on peut décorer le sapin.",
            gifts: [
                {
                    title: "Un disque de jazz",
                    detail: "Pour écouter dans la voiture quand je m'ennuie",
                    url: "https://www.fnac.com/a16575512/EMOTIONAL-GANGSTER",
                    offered: false
                },
                {
                    title: "Une pelle à tarte moche",
                    detail: "",
                    url: "https://www.pylones.com/fr/pelle-a-tarte/10022-pelle-a-tarte-filou-green-flower.html",
                    offered: false
                },
                {
                    title: "Des m&m's",
                    detail: "J'en voudrais de toutes les couleurs",
                    url: "https://www.etsy.com/fr/listing/926605765/cartoon-character-mms-sweet-5d-diy?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_fr_fr_fr_e-home_and_living-home_decor-other&utm_custom1=_k_CjwKCAjwg4SpBhAKEiwAdyLwvOg94K2EEJQFgUx3SJC7bXop-IEUy9BZ4XmxQ-YoD86hk6VfD3ugFhoC96EQAvD_BwE_k_&utm_content=go_304982059_20954724979_76789459219_pla-106551393635_c__926605765frfr_102857959&utm_custom2=304982059&gclid=CjwKCAjwg4SpBhAKEiwAdyLwvOg94K2EEJQFgUx3SJC7bXop-IEUy9BZ4XmxQ-YoD86hk6VfD3ugFhoC96EQAvD_BwE",
                    offered: true
                }
            ]
        },
        {
            pseudo: "Géraldine",
            password: "motdepasse1",
            email: "utilisateur1@example.com",
            token: "token123",
            isAdult: true,
            intro: "Bienvenue sur notre plateforme !",
            gifts: [
                {
                    title: "Une plante verte",
                    detail: "Ca sert à rien mais c'est joli, m'enfin, si, ça sert mais ça ne se voit pas",
                    url: "https://www.willemsefrance.fr/products/cafeier",
                    offered: false,
                    date: "2021-10-22"
                },
                {
                    title: "Un poulpe",
                    detail: "Parce que ça fait trop longtemps que je n'en ai pas eu",
                    url: "https://www.mer-ocean.com/le-saviez-vous-focus-sur-les-pieuvres/",
                    offered: false,
                    date: "2021-10-22"
                }
            ]
        },
        {
            pseudo: "Gérard",
            password: "motdepasse2",
            email: "utilisateur2@example.com",
            token: "token456",
            isAdult: false,
            intro: "Bonjour à tous !",
            gifts: [
                {
                    title: "Une surprise",
                    detail: "Parce que trouver des cadeaux au pied levé, trop dur",
                    url: "https://www.temu.com/kuiper/dn9.html?subj=downloadable-ads-shopping&_bg_fs=1&_p_jump_id=841&_x_vst_scene=adg&goods_id=601099518045414&sku_id=17592222492642&adg_ctx=a-d8b3d99e~c-4169a77e~f-98020770&_x_ads_sub_channel=shopping&_p_rfs=1&_x_ns_prz_type=3&_x_ns_sku_id=17592222492642&mrk_rec=1&_x_ads_channel=google&_x_gmc_account=742384653&_x_login_type=Google&_x_ads_account=5198328713&_x_ads_set=20119649211&_x_ads_id=149548612552&_x_ads_creative_id=658327580848&_x_ns_source=g&_x_ns_gclid=CjwKCAjwg4SpBhAKEiwAdyLwvB9wFVOOr0NOy9ixtv3yFkR_PjfsYekA-tH8JuDkUJJxuTJy_kNhWhoCNKMQAvD_BwE&_x_ns_placement=&_x_ns_match_type=&_x_ns_ad_position=&_x_ns_product_id=17592222492642&_x_ns_target=&_x_ns_devicemodel=&_x_ns_wbraid=CjkKCQjw4P6oBhD6ARIoAHW15XBdRxAi2VEZRzBB6AznMjOZJv1cZq1Na21Y-gO_sKrV1aXk5hoCYno&_x_ns_gbraid=0AAAAAo4mICF0axK9-Tq5PfGRe7Glx9lPP&_x_ns_targetid=pla-2087099732323&gclid=CjwKCAjwg4SpBhAKEiwAdyLwvB9wFVOOr0NOy9ixtv3yFkR_PjfsYekA-tH8JuDkUJJxuTJy_kNhWhoCNKMQAvD_BwE",
                    offered: false,
                    date: "2021-10-22"
                },
                {
                    title: "Un cable qui relie mon ordi portable à mon gros écran",
                    detail: "C'est pratique",
                    url: "",
                    offered: false,
                    date: "2021-10-22"
                }
            ]
        },
        {
            pseudo: "Marcel",
            password: "motdepasse3",
            email: "utilisateur3@example.com",
            token: "token789",
            isAdult: true,
            intro: "Vive les vacances ! Pis c'est super Noël parce que des fois il y a de la neige et des cadeaux. Et puis on peut décorer le sapin.",
            gifts: [
                {
                    title: "Un disque de jazz",
                    detail: "Pour écouter dans la voiture quand je m'ennuie",
                    url: "https://www.fnac.com/a16575512/EMOTIONAL-GANGSTER",
                    offered: false,
                    date: "2021-10-22"
                },
                {
                    title: "Une pelle à tarte moche",
                    detail: "",
                    url: "https://www.pylones.com/fr/pelle-a-tarte/10022-pelle-a-tarte-filou-green-flower.html",
                    offered: false,
                    date: "2021-10-22"
                },
                {
                    title: "Des m&m's",
                    detail: "J'en voudrais de toutes les couleurs",
                    url: "https://www.etsy.com/fr/listing/926605765/cartoon-character-mms-sweet-5d-diy?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_fr_fr_fr_e-home_and_living-home_decor-other&utm_custom1=_k_CjwKCAjwg4SpBhAKEiwAdyLwvOg94K2EEJQFgUx3SJC7bXop-IEUy9BZ4XmxQ-YoD86hk6VfD3ugFhoC96EQAvD_BwE_k_&utm_content=go_304982059_20954724979_76789459219_pla-106551393635_c__926605765frfr_102857959&utm_custom2=304982059&gclid=CjwKCAjwg4SpBhAKEiwAdyLwvOg94K2EEJQFgUx3SJC7bXop-IEUy9BZ4XmxQ-YoD86hk6VfD3ugFhoC96EQAvD_BwE",
                    offered: true,
                    date: "2021-10-22"
                }
            ]
        }
    ];

export { usersArray };

