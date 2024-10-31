// Select filter buttons
document.querySelectorAll('.filter-options button').forEach(button => {
    button.addEventListener('click', function () {
        const sectionButtons = this.closest('.filter-section').querySelectorAll('button');
        const isAllButton = this.getAttribute('data-filter') === 'All';

        // Toggle "All" button functionality
        if (isAllButton) {
            if (this.classList.contains('active')) {
                // Deselect "All" and clear everything
                this.classList.remove('active');
                sectionButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.project-card').forEach(card => card.style.display = 'none');
            } else {
                // Select "All" and show all projects for this section
                sectionButtons.forEach(btn => btn.classList.add('active'));
                document.querySelectorAll('.project-card').forEach(card => card.style.display = 'block');
            }
        } else {
            // Toggle individual filter buttons
            this.classList.toggle('active');
            sectionButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'All') btn.classList.remove('active');
            });
        }

        // Collect active filters across sections
        const activeFilters = {
            skill: [...document.querySelectorAll('.filter-section:nth-child(1) .active')].map(btn => btn.getAttribute('data-filter')),
            language: [...document.querySelectorAll('.filter-section:nth-child(2) .active')].map(btn => btn.getAttribute('data-filter')),
            tool: [...document.querySelectorAll('.filter-section:nth-child(3) .active')].map(btn => btn.getAttribute('data-filter'))
        };

        // Modify filter projects based on active selections
        document.querySelectorAll('.project-card').forEach(card => {
            const cardSkills = card.getAttribute('data-skill') ? card.getAttribute('data-skill').split(' ') : [];
            const cardLanguages = card.getAttribute('data-language') ? card.getAttribute('data-language').split(' ') : [];
            const cardTools = card.getAttribute('data-tool') ? card.getAttribute('data-tool').split(' ') : [];

            const matches = (
                (activeFilters.skill.includes('All') ? cardSkills.length > 0 : activeFilters.skill.length === 0 || activeFilters.skill.some(filter => cardSkills.includes(filter))) &&
                (activeFilters.language.includes('All') ? cardLanguages.length > 0 : activeFilters.language.length === 0 || activeFilters.language.some(filter => cardLanguages.includes(filter))) &&
                (activeFilters.tool.includes('All') ? cardTools.length > 0 : activeFilters.tool.length === 0 || activeFilters.tool.some(filter => cardTools.includes(filter)))
            );

            card.style.display = matches ? 'block' : 'none';
        });

        // Hide all projects if no filters are active
        const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);
        if (!hasActiveFilters) {
            document.querySelectorAll('.project-card').forEach(card => card.style.display = 'none');
        }
    });
});

// Global All functionality
document.getElementById('global-all').addEventListener('click', function () {
    // Make all filter buttons active across sections
    document.querySelectorAll('.filter-options button').forEach(btn => btn.classList.add('active'));

    // Show all project cards
    document.querySelectorAll('.project-card').forEach(card => card.style.display = 'block');
});

// Clear all filters
document.getElementById('clear-filters').addEventListener('click', function () {
    document.querySelectorAll('.project-card').forEach(card => card.style.display = 'none');
    document.querySelectorAll('.filter-options button').forEach(btn => btn.classList.remove('active'));
});
