exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('templates').del();
  await knex('templates').insert([
    {
      id: 1, 
      name: 'Modern SaaS Dashboard', 
      description: 'A beautiful and modern dashboard for SaaS applications with charts and analytics.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      category: 'Dashboard'
    },
    {
      id: 2, 
      name: 'E-commerce Storefront', 
      description: 'A fully responsive e-commerce storefront template with shopping cart features.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop', 
      category: 'E-commerce'
    },
    {
      id: 3, 
      name: 'Creative Portfolio', 
      description: 'Showcase your work with this creative and elegant portfolio template.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop', 
      category: 'Portfolio'
    },
    {
      id: 4, 
      name: 'Corporate Landing Page', 
      description: 'A professional landing page designed to convert visitors into leads.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', 
      category: 'Landing Page'
    },
    {
      id: 5, 
      name: 'Blog Platform', 
      description: 'A clean and readable blog template with markdown support.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop', 
      category: 'Blog'
    }
  ]);
};
