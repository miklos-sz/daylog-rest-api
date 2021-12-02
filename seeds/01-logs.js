const TABLE_NAME = 'logs'

export function seed(knex, Promise) {
    return knex(TABLE_NAME).del()
        .then(function () {
            return knex(TABLE_NAME).insert([
                {
                    title: 'Test title',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus, quam ac sagittis tincidunt, nunc turpis suscipit ex, ac vestibulum justo massa non velit. Ut faucibus tortor odio, a vehicula arcu bibendum nec. Vestibulum finibus turpis in eros aliquam consectetur. Nunc eleifend sapien turpis, sit amet posuere leo sodales sit amet. Morbi sit amet eleifend nisi, nec suscipit ligula. Duis erat sem, eleifend eget finibus nec, aliquet a ex. Donec ultrices at elit et pulvinar. Cras id consequat enim. Cras et lectus facilisis tellus bibendum facilisis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In viverra ligula sit amet fermentum finibus. Sed accumsan bibendum felis, ac rhoncus nisl blandit nec. Curabitur pulvinar, eros id ultricies lacinia, lectus leo dapibus quam, nec porttitor velit risus cursus ante.',
                    meta: 'test meta data'
                }
            ])
        })
}
